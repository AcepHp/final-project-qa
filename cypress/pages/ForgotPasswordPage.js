class ForgotPasswordPage {

    visitLogin() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    clickForgotPassword() {
        cy.contains('Forgot your password?').click()
    }

    verifyResetPasswordPage() {
        cy.url().should('include', '/auth/requestPasswordResetCode')
        cy.contains('Reset Password').should('be.visible')
    }

    inputUsername(username) {
        cy.get('input[name="username"]').clear().type(username)
    }

    clickResetButton() {
        cy.get('button[type="submit"]').click()
    }

    clickCancelButton() {
        cy.contains('Cancel').click()
    }

    verifySuccessMessage() {
        cy.contains('Reset Password link sent successfully').should('be.visible')
    }

    verifyRequiredMessage() {
        cy.contains('Required').should('be.visible')
    }

    verifyBackToLogin() {
        cy.url().should('include', '/auth/login')
    }
}

export default new ForgotPasswordPage()