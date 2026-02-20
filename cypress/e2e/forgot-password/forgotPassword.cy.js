import ForgotPasswordPage from "../../pages/ForgotPasswordPage"

describe("OrangeHRM Forgot Password - POM + Intercept", () => {

    beforeEach(() => {
        ForgotPasswordPage.visitLogin()
    })

    it("TC-007 Akses halaman Forgot Password", () => {

        cy.intercept('GET', '**/auth/requestPasswordResetCode')
            .as('forgotPage')

        ForgotPasswordPage.clickForgotPassword()

        cy.wait('@forgotPage')

        cy.url().should('include', 'requestPasswordResetCode')

        ForgotPasswordPage.verifyResetPasswordPage()
    })

    it("TC-008 Reset password dengan username valid", () => {

        cy.fixture('forgotPasswordData').then((data) => {

            ForgotPasswordPage.clickForgotPassword()

            ForgotPasswordPage.inputUsername(data.validUser.username)
            ForgotPasswordPage.clickResetButton()

            cy.url().should('include', 'sendPasswordReset')

            ForgotPasswordPage.verifySuccessMessage()
        })
    })

    it("TC-009 Reset password tanpa mengisi username", () => {

        ForgotPasswordPage.clickForgotPassword()

        cy.intercept('POST', '**/auth/sendPasswordReset').as('emptyReset')

        ForgotPasswordPage.clickResetButton()

        cy.get('@emptyReset.all').should('have.length', 0)

        ForgotPasswordPage.verifyRequiredMessage()
    })

    it("TC-010 Klik tombol Cancel pada halaman Reset Password", () => {

        ForgotPasswordPage.clickForgotPassword()

        ForgotPasswordPage.clickCancelButton()

        cy.url().should('include', 'login')

        ForgotPasswordPage.verifyBackToLogin()
    })

})