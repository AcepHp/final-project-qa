import LoginPage from "../../pages/LoginPage";

describe("OrangeHRM Login Feature - POM + Intercept", () => {
    beforeEach(() => {
        LoginPage.visit();
    });

    // Login dengan data valid
    it("TC-001 Login dengan data valid", () => {
        cy.fixture("loginData").then((data) => {
            cy.intercept("POST", "**/auth/validate").as("loginValid");

            LoginPage.inputUsername(data.validUser.username);
            LoginPage.inputPassword(data.validUser.password);
            LoginPage.clickLogin();

            cy.wait("@loginValid").then((interception) => {
                expect(interception.response.statusCode).to.eq(302);
                expect(interception.request.body).to.include(
                    `username=${data.validUser.username}`,
                );
            });

            LoginPage.verifyDashboard();
        });
    });

    // Login dengan password salah
    it("TC-002 Login dengan password salah", () => {
        cy.fixture("loginData").then((data) => {
            cy.intercept("POST", "**/auth/validate").as("wrongPassword");

            LoginPage.inputUsername(data.wrongPassword.username);
            LoginPage.inputPassword(data.wrongPassword.password);
            LoginPage.clickLogin();

            cy.wait("@wrongPassword");

            LoginPage.verifyInvalidCredential();
        });
    });

    // Login dengan username salah
    it("TC-003 Login dengan username salah", () => {
        cy.fixture("loginData").then((data) => {
            cy.intercept("POST", "**/auth/validate").as("wrongUsername");

            LoginPage.inputUsername(data.wrongUsername.username);
            LoginPage.inputPassword(data.wrongUsername.password);
            LoginPage.clickLogin();

            cy.wait("@wrongUsername");

            LoginPage.verifyInvalidCredential();
        });
    });

    // Login tanpa username dan password
    it("TC-004 Login tanpa username dan password", () => {
        cy.intercept("POST", "**/auth/validate").as("emptyLogin");

        LoginPage.clickLogin();

        // Tidak ada request terkirim
        cy.get("@emptyLogin.all").should("have.length", 0);

        LoginPage.verifyRequiredMessage();
    });

    // Login tanpa username
    it("TC-005 Login tanpa username", () => {
        cy.fixture("loginData").then((data) => {
            cy.intercept("POST", "**/auth/validate").as("noUsername");

            LoginPage.inputPassword(data.validUser.password);
            LoginPage.clickLogin();

            cy.get("@noUsername.all").should("have.length", 0);

            LoginPage.verifyRequiredMessage();
        });
    });

    // Login tanpa password
    it("TC-006 Login tanpa password", () => {
        cy.fixture("loginData").then((data) => {
            cy.intercept("POST", "**/auth/validate").as("noPassword");

            LoginPage.inputUsername(data.validUser.username);
            LoginPage.clickLogin();

            cy.get("@noPassword.all").should("have.length", 0);

            LoginPage.verifyRequiredMessage();
        });
    });
});
