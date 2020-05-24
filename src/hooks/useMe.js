import React, { useContext } from 'react';

export const MeContext = React.createContext();

const useMe = () => useContext(MeContext);

export default useMe;
