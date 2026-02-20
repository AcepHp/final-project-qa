import DirectoryPage from "../../pages/DirectoryPage"

describe("OrangeHRM Directory - POM + Intercept", () => {

    beforeEach(() => {
        DirectoryPage.visitLogin()
        DirectoryPage.login("Admin", "admin123")
    })

    it("TC-011 Akses menu Directory dari Dashboard", () => {

        cy.intercept('GET', '**/api/v2/directory/employees*')
            .as('directoryPage')

        DirectoryPage.clickDirectoryMenu()

        cy.wait('@directoryPage')

        DirectoryPage.verifyDirectoryPage()
    })

    it("TC-012 Pencarian employee dengan nama valid", () => {

        cy.fixture('directoryData').then((data) => {

            DirectoryPage.clickDirectoryMenu()

            cy.intercept('GET', '**/api/v2/directory/employees*')
                .as('searchByName')

            DirectoryPage.inputEmployeeName(data.validSearch.employeeName)
            DirectoryPage.clickSearchButton()

            cy.wait('@searchByName').its('response.statusCode')
                .should('eq', 200)

            DirectoryPage.verifySearchResult(data.validSearch.employeeName)
        })
    })


    it("TC-013 Reset filter pencarian", () => {

        cy.fixture('directoryData').then((data) => {

            DirectoryPage.clickDirectoryMenu()

            DirectoryPage.inputEmployeeName(data.validSearch.employeeName)
            DirectoryPage.clickResetButton()

            cy.get('input[placeholder="Type for hints..."]').should('have.value', '')
        })
    })

})