import React from "react";

type Contact = {
    
    fullname: string,
    
};
async function getContact(){
    const res = await fetch ("http://localhost:3000/api/contact", {cache: 'no-store'})
    const result = await res.json();
    return result.contacts
}

export default async function ListContact() {
    const contacts: Contact[] = await getContact();
  return (
    <>
    <div>
    <table>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <tr key={index}>
                        <td>
                            {contact.fullname}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
     
    </>
  )  
}