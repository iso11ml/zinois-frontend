import Modal from "@/components/modal";
import React from "react";
import FormContact from "./form-contact";

interface DataType {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  address: string;
  userId: string
}

interface ContactCardProps {
  contact: DataType;
  handleContact: () => void,
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, handleContact }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">{contact.name} {contact.lastName}</h2>
      <p className="text-gray-700"><strong>Phone:</strong> {contact.phone}</p>
      <p className="text-gray-700"><strong>Address:</strong> {contact.address}</p>
      <div className="flex w-full justify-end">
        <Modal dialogTitle={"Actualizar"} dialogDescription={"Actualiza la infomración de tu contacot"} dialogTrigger={"Actualizar"}>
          <FormContact handleContact={handleContact} contact={contact}/>
        </Modal>

      </div>
    </div>
  );
};

export default ContactCard;
