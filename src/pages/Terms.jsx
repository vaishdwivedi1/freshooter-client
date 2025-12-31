import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const sections = [
  { id: "terms", title: "Terms & Conditions", content: "Here are our terms and conditions..." },
  { id: "about", title: "About Us", content: "We are a passionate team working on..." },
  { id: "contact", title: "Contact Us", content: "Reach out to us at support@example.com..." },
  { id: "return", title: "Return Policy", content: "We accept returns within 7 days..." },
  { id: "support", title: "Support Policy", content: "Our support team is available 24/7..." },
  { id: "privacy", title: "Privacy Policy", content: "Your data is safe with us..." },
];

const Terms = () => {
  const location = useLocation();
  const sectionRefs = useRef({});

  useEffect(() => {
    const sectionId = location.hash?.replace("#", "");
    if (sectionId && sectionRefs.current[sectionId]) {
      sectionRefs.current[sectionId].scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-primary mb-6">Info Center</h1>

      {sections.map((section) => (
        <div
          key={section.id}
          id={section.id}
          ref={(el) => (sectionRefs.current[section.id] = el)}
          className="space-y-2 border-b pb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
          <p className="text-gray-600">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Terms;
