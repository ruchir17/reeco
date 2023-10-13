import data from '../assets/data/data.json';

// export function fetchData() {
//   return new Promise(resolve => {
//     // Simulate an asynchronous API call
//     setTimeout(() => {
//       resolve(data);
//     }, 500);
//   });
// }

export const fetchData = async (endpoint) => {
    try {
      // Simulate fetching data from the mockData.json file
      // Adjust the logic based on the structure of your mock data
        return data;
      // Handle other endpoints as needed
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export const updateUserName = async (userId, newStatus) => {
    try {
      // Simulate updating data on the server
      // In a real scenario, you would send a request to a server
      const updatedData = data.map(item => {
        if (item.id === userId) {
          return { ...item, status: newStatus };
        }
        return item;
      });
  
      // Save the updated data
      data = updatedData;
  
      return true; // Indicate success
    } catch (error) {
      console.error('Error updating user name:', error);
      throw error;
    }
  };

  export const updatePriceAndQuantity = async (userId, newPrice, newQuantity) => {
    try {
      // Simulate updating data on the server
      // In a real scenario, you would send a request to a server
      const updatedData = data.map(item => {
        if (item.id === userId) {
          let newStatus = 
          (item.price.toString()===newPrice.toString() && item.quantity.toString()===newQuantity.toString())  ? item.status : item.quantity===newQuantity ? "PRICE UPDATED" : item.price===newPrice ? "QUANTITY UPDATED" :"QUANTITY AND PRICE UPDATED"; 
          return { ...item, price : newPrice , quantity : newQuantity , status : newStatus};
        }
        return item;
      });
  
      // Save the updated data
      data = updatedData;
  
      return true; // Indicate success
    } catch (error) {
      console.error('Error updating user name:', error);
      throw error;
    }
  };