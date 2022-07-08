 describe('RecoverPassword', () => {
    it('LaunchURL', () => {
      cy.visit('https://stg.urbanasolutions.io/')     
      cy.title().should('eq', 'Urbana IoT')
    })
  
   it('NavigateTORecoveryPassword', () => {

      //To handle the dynamic wait, I am using the cy.intercept for wait until the desire request will not found.
      cy.intercept('GET','/api/v1/projects/74ed8121-2f34-4d2b-805d-8bcdacce8a66/exports?format=jsonflat&locale=en&projectId=74ed8121-2f34-4d2b-805d-8bcdacce8a66').as("untilPageload")


      cy.visit('https://stg.urbanasolutions.io/')    
      //cy.wait(10000)

      //Here the above static wait replaces it with Dynamic page load to click on visible button
      cy.wait("@untilPageload").its('response.statusCode').should('eq',200)

      cy.get('[type="button"]').should('be.visible').click({ multiple: true })
      cy.get('[for="exampleEmail"]').should('have.text','E-mail')
      //Navigate on Login page again
     // cy.wait(20000)
      cy.get('[type="button"]').click({ multiple: true })
    })

   it('InvalidEmailForRecovery', () => {

      cy.intercept('GET','/api/v1/projects/74ed8121-2f34-4d2b-805d-8bcdacce8a66/exports?format=jsonflat&locale=en&projectId=74ed8121-2f34-4d2b-805d-8bcdacce8a66').as("untilPageload")

      cy.intercept('POST','https://api.stg.urbanasolutions.io/v1/forgot-password').as("Error")

      cy.visit('https://stg.urbanasolutions.io/')    

      //cy.wait(10000)

      cy.wait("@untilPageload").its('response.statusCode').should('eq',200)
      cy.get('[type="button"]').click({ multiple: true })
      cy.wait(10000)
      cy.get('[for="exampleEmail"]').should('have.text','E-mail')
      //Navigate on Login page again
      cy.get('[name="email"]').type('abc@gmail.com')
     // cy.wait(20000)
      cy.get('[type="submit"]').click({ multiple: true })

      cy.wait("@Error").its('response.statusCode').should('eq', 404)
     // cy.request('https://api.stg.urbanasolutions.io/v1/forgot-password').as('success')
      //cy.get('@success').its('status').should('equal',200)
      
      //cy.wait(10000)
      
    })

    it('ValidEmailForRecovery', () => {

      cy.intercept('GET','/api/v1/projects/74ed8121-2f34-4d2b-805d-8bcdacce8a66/exports?format=jsonflat&locale=en&projectId=74ed8121-2f34-4d2b-805d-8bcdacce8a66').as("untilPageload")

      cy.intercept('POST','https://api.stg.urbanasolutions.io/v1/forgot-password').as("Success")

      cy.visit('https://stg.urbanasolutions.io/')  
     // cy.wait(10000)   
      cy.wait("@untilPageload").its('response.statusCode').should('eq',200)
      cy.get('[type="button"]').click({ multiple: true })
     // cy.wait(10000)
      cy.get('[for="exampleEmail"]').should('have.text','E-mail')
      //Navigate on Login page again
      cy.get('[name="email"]').type('potapo5841@lenfly.com')
     // cy.wait(20000)
      cy.get('[type="submit"]').click({ multiple: true })

      cy.wait("@Success").its('response.statusCode').should('eq', 200)
     // cy.request('https://api.stg.urbanasolutions.io/v1/forgot-password').as('success')
     // cy.get('@success').its('status').should('equal',200)
      
      //cy.wait(10000)

    })

  })