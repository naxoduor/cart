import {Address} from "../models/index.js";

export async function createAddressInDB(name,phone_number,postal_address,email, order_id) {
    let newAddress = Address.build({name, phone_number,postal_address, email,order_id});
    return await newAddress.save();
}


// export async function getAddressByPk(address_id) {
//     return await Address.findByPk(address_id)
  
//   }
  
  
  export async function getAllAddresses() {
    return await Address.findAll()
  }

  


  