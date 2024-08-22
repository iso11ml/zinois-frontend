import React from "react";

interface DataType {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  address: string;
}

interface ContactCardProps {
  contact: DataType;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">{contact.name} {contact.lastName}</h2>
      <p className="text-gray-700"><strong>Phone:</strong> {contact.phone}</p>
      <p className="text-gray-700"><strong>Address:</strong> {contact.address}</p>
    </div>
  );
};

export default ContactCard;
