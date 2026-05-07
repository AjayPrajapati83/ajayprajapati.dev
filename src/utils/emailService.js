import emailjs from '@emailjs/browser'

/**
 * Send a contact form message via EmailJS using sendForm
 * This sends the form data directly using the form element reference
 *
 * @param {HTMLFormElement} formElement - The form DOM element
 * @returns {Promise}
 */
export async function sendMessageFromForm(formElement) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is missing. Check your .env file.')
  }

  try {
    const response = await emailjs.sendForm(serviceId, templateId, formElement, {
      publicKey: publicKey,
    })
    console.log('EmailJS success:', response)
    return response
  } catch (error) {
    console.error('EmailJS error:', error)
    throw error
  }
}

/**
 * Send a contact form message via EmailJS using send with template params
 *
 * @param {Object} formData - { name, email, message }
 * @returns {Promise}
 */
export async function sendMessage(formData) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is missing. Check your .env file.')
  }

  // Send all common variable names so the template can pick whichever it uses
  const templateParams = {
    name: formData.name,
    from_name: formData.name,
    user_name: formData.name,
    email: formData.email,
    from_email: formData.email,
    user_email: formData.email,
    reply_to: formData.email,
    message: formData.message,
    to_name: 'Ajay',
  }

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey: publicKey,
    })
    console.log('EmailJS success:', response)
    return response
  } catch (error) {
    console.error('EmailJS error:', error)
    throw error
  }
}
