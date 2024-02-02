import React from 'react';
import {
  Home as HomeIcon,
  Payment as PaymentIcon,
  AccountBalanceWallet as AccountIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed-bottom">
      <Row className="footer-contain" style={{ backgroundColor: 'black' }}>
        <Col
          xs={3}
          className="text-center footer-col mt-2"
          onClick={() => handleNavigation('/')}
        >
          <HomeIcon style={{ fontSize: 24, color: 'white' }} />
          <p className="p text-white">Home</p>
        </Col>
        <Col
          xs={3}
          className="text-center footer-col mt-2"
          onClick={() => handleNavigation('/investment')}
        >
          <PaymentIcon style={{ fontSize: 24, color: 'white' }} />
          <p className="p text-white">Payment</p>
        </Col>
        <Col
          xs={3}
          className="text-center footer-col mt-2"
          onClick={() => handleNavigation('/account')}
        >
          <AccountIcon style={{ fontSize: 24, color: 'white' }} />
          <p className="p text-white">Account</p>
        </Col>
        <Col
          xs={3}
          className="text-center footer-col mt-2"
          onClick={() => handleNavigation('/profile')}
        >
          <ProfileIcon style={{ fontSize: 24, color: 'white' }} />
          <p className="p text-white">Profile</p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
