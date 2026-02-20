class DirectoryPage {
    visitLogin() {
        cy.visit(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        );
        cy.url().should("include", "/auth/login");
        cy.get('input[name="username"]', { timeout: 10000 }).should("be.visible");
    }

    login(username, password) {
        cy.get('input[name="username"]').clear().type(username);
        cy.get('input[name="password"]').clear().type(password);
        cy.get('button[type="submit"]').click();

        cy.url({ timeout: 10000 }).should("include", "/dashboard");
    }

    clickDirectoryMenu() {
        cy.contains("span", "Directory", { timeout: 10000 }).click();
    }

    verifyDirectoryPage() {
        cy.url().should("include", "/directory");
        cy.contains("h6", "Directory").should("be.visible");
    }

    inputEmployeeName(name) {
        cy.get('input[placeholder="Type for hints..."]')
            .should("be.visible")
            .clear()
            .type(name);

        cy.wait(1500);

        cy.get("body").then(($body) => {
            if ($body.find(".oxd-autocomplete-option").length > 0) {
                cy.contains(".oxd-autocomplete-option", name).click({ force: true });
            }
        });
    }

    selectJobTitle(jobTitle) {
        cy.contains("label", "Job Title").parent().find(".oxd-select-text").click();

        cy.contains(".oxd-select-option", jobTitle, { timeout: 10000 }).click();
    }

    clickSearchButton() {
        cy.contains("button", "Search").click();
    }

    clickResetButton() {
        cy.contains("button", "Reset").click();
    }

    verifySearchResult(name) {
        cy.contains(".orangehrm-directory-card", name, { timeout: 10000 }).should(
            "be.visible",
        );
    }

    verifyNoResult() {
        cy.contains("No Records Found", { timeout: 10000 }).should("be.visible");
    }
}

export default new DirectoryPage();
