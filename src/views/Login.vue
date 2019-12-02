<template>
  <b-container class="d-flex justify-content-center mt-4 align-items-center content">
    <amplify-authenticator :authConfig="authConfig"></amplify-authenticator>
  </b-container>
</template>

<script>
export default {
  data: () => ({
    authConfig: {
      usernameAttributes: "Email",
      signUpConfig: {
        header: "Human Resources Login",
        hideAllDefaults: true,
        defaultCountryCode: "1",
        signUpFields: [
          {
            label: "Email",
            key: "email",
            required: true,
            displayOrder: 1,
            type: "string",
            signUpWith: true
          },
          {
            label: "Password",
            key: "password",
            required: true,
            displayOrder: 2,
            type: "password"
          },
          {
            label: "First Name",
            // required: true,
            key: "given_name",
            displayOrder: 3,
            type: "string"
          },
          {
            label: "Last Name",
            // required: true,
            key: "family_name",
            displayOrder: 4,
            type: "string"
          },
          {
            label: "Phone Number",
            key: "phone_number",
            required: true,
            displayOrder: 6,
            type: "string"
          }
        ]
      }
    }
  })
};
</script>

<style lang="scss">
@media only screen and (max-width: 599px) {
  .Form__formSection___3tqxz {
    min-width: auto;
  }
}
</style>
