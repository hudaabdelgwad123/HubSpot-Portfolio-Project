document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form
      if (!validateForm(form)) {
        return;
      }

      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Show loading state
      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Open default email client (e.g., Outlook) via mailto
      sendViaMailto(data)
        .then((response) => {
          // Success
          formMessage.textContent =
            "Opening your email app to send the message...";
          formMessage.className = "form-message success";

          // Reset form
          form.reset();

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = "none";
          }, 5000);
        })
        .catch((error) => {
          // Error
          formMessage.textContent =
            "Oops! Something went wrong. Please try again or contact us directly via email.";
          formMessage.className = "form-message error";

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          console.error("Form submission error:", error);
        });
    });
  }

  // Form validation
  function validateForm(form) {
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const subject = form.querySelector("#subject").value.trim();
    const message = form.querySelector("#message").value.trim();

    if (!name || !email || !subject || !message) {
      showError("Please fill in all required fields.");
      return false;
    }

    if (!isValidEmail(email)) {
      showError("Please enter a valid email address.");
      return false;
    }

    return true;
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show error message
  function showError(message) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = "form-message error";
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }
  }

  // Build a mailto link and open default email client
  function sendViaMailto(data) {
    return new Promise((resolve, reject) => {
      try {
        const toFromDataAttr = (form.dataset.toEmail || "").trim();
        const toFromContactInfo = (() => {
          const mailtoLink = document.querySelector(
            '.contact-info a[href^="mailto:"]'
          );
          if (mailtoLink) {
            const href = mailtoLink.getAttribute("href") || "";
            const match = href.match(/^mailto:([^?]+)(?:\?|$)/i);
            return match ? match[1] : "";
          }
          return "";
        })();

        const to = (toFromDataAttr || toFromContactInfo || "").trim();
        if (!to) {
          showError(
            "Recipient email is not configured. Please set an email in the contact info."
          );
          return reject(new Error("Missing recipient email"));
        }

        const subject = `[Portfolio] ${data.subject || ""}`;
        const bodyLines = [
          `Name: ${data.name || ""}`,
          `Email: ${data.email || ""}`,
          `Subject: ${data.subject || ""}`,
          "",
          data.message || "",
        ];
        const body = bodyLines.join("\r\n");

        const mailto = `mailto:${encodeURIComponent(
          to
        )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          body
        )}`;

        // Open default mail client
        window.location.href = mailto;
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
});
