// import React, { createContext, useState } from 'react';

// interface ImageContextProps {
//   value: string;
//   setValue: React.Dispatch<React.SetStateAction<string>>;
// }

// export const ImageContext = createContext<ImageContextProps | undefined>(undefined);

// export const ImageContextProvider: React.FC = ({ children }) => {
//   const [value, setValue] = useState('');

//   return (
//     <ImageContext.Provider value={{ value, setValue }}>
//       {children}
//     </ImageContext.Provider>
//   );
// };