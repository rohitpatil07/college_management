import React from "react";
import { useState, useEffect } from "react";
import WelcomeModal from "../../components/Company/WelcomeModal";

const CompanyHome = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);
  return <div>{showModal && <WelcomeModal />}</div>;
};

export default CompanyHome;
