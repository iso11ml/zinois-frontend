import Modal from "@/components/modal";
import React from "react";
import FormContact from "./form-contact";
import { Button } from "@/components/ui/button";
import { DELETE } from "../services/contact-service";
import { useAuth } from "@/providers/auth-provider";

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

  const { token } = useAuth()

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">{contact.name} {contact.lastName}</h2>
      <p className="text-gray-700"><strong>Phone:</strong> {contact.phone}</p>
      <p className="text-gray-700"><strong>Address:</strong> {contact.address}</p>
      <div className="flex w-full justify-end">
        <Modal dialogTitle={"Actualizar"} dialogDescription={"Actualiza la infomración de tu contacto"} dialogTrigger={"Actualizar"}>
          <FormContact handleContact={handleContact} contact={contact} />
        </Modal>

        <Modal dialogTitle={"Eliminar"} dialogDescription={`¿Estás seguro de elimiar a ${contact.name}`} dialogTrigger={"Elimar"}>
          <div className="flex justify-end">
            <Button onClick={() => DELETE(token, contact.id)} />
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default ContactCard;
