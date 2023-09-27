import React,{useState,useEffect} from 'react'
import { Button, Menu, Typography, Avatar} from 'antd'
import { Link } from 'react-router-dom';
import {HomeOutlined,BulbOutlined,FundOutlined,MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png'
const NavBar = () => {
  // this part for making UI compatible with mobile
  const [activemenu,setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(()=>{
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize',handleResize);
    handleResize();

    return () => window.removeEventListener('resize',handleResize)
  },[]) 

  useEffect(() => {
    if(screenSize < 768){
      setActiveMenu(false);
    }
    else{
      setActiveMenu(true);
    }
  }, [screenSize])
  

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />

        <Typography.Title level={2} className="logo">
          <Link to="/">BitVibe</Link>
        </Typography.Title>
      
      </div>

      <Button className='menu-control-container'
      onClick={()=>setActiveMenu(!activemenu)}>
        <MenuOutlined />
      </Button>

      {/* show if active menu is true */}

      {activemenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>

          {/* <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchange</Link>
          </Menu.Item> */}

          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}

        {/* for mobile devices */}
        {/* <Button className='menu-control-container'></Button> */}
    </div>
  );
}

export default NavBar