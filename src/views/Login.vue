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
            label: "PhoneNumber",
            key: "phone_number",
            required: true,
            displayOrder: 3,
            type: "string"
          }
        ]
      }
    }
  }),
};
</script>

<style lang="scss">
@media only screen and (max-width: 599px) {
  .Form__formSection___3tqxz {
    min-width: auto;
  }
}
</style>
