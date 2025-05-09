(function () {
  emailjs.init("bgPMvjgJ9C-HJ3z9j");
})();

const btn = document.getElementById("button");
const firstName = document.getElementById("name");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_gs2wivh";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Submit";
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        phone.value = "";
        message.value = "";
        alert("Message Sent");
      },
      (err) => {
        btn.value = "Submit";
        alert(JSON.stringify(err));
      }
    );
  });
