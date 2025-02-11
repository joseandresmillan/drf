import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          rows="5"
          required
        ></textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}

export default ContactForm;