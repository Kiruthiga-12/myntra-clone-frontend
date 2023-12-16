import { Button } from '@mui/material';
import { useState } from 'react';
import Slider_Image from './Slider_Image';
import Best_Buys from './Best_Buys';
import Categories_To_Bag from './Categories_To_Bag';
import Deal_Of_The_Day from './Deal_Of_The_Day';
import Top_Picks from './Top_Picks';
import Vendor_Landing from './Vendor_Landing';
const Add_Product = () => {
    const [add_product, setAddProduct] = useState('add_product');
    return (<>
        {add_product === 'add_product' && <>
            <Button sx={{
                textTransform: 'none', color: 'white', backgroundColor: "rgb(243, 66, 140)",
                marginTop: '40px', marginLeft: "40px", padding: '5px 10px', fontSize: '15px',
                '&:hover': { color: 'white', backgroundColor: 'rgb(243, 66, 140)' }
            }} onClick={(e) => setAddProduct('Slider Image')}>Slider Image &gt; &gt;</Button>
            <br></br>
            <Button sx={{
                textTransform: 'none', color: 'white', backgroundColor: "rgb(243, 66, 140)",
                marginTop: '40px', marginLeft: "40px", padding: '5px 10px', fontSize: '15px',
                '&:hover': { color: 'white', backgroundColor: 'rgb(243, 66, 140)' }
            }} onClick={(e) => setAddProduct('Deal of The Day')}>Deal of The Day &gt; &gt;</Button>
            <br></br>
            <Button sx={{
                textTransform: 'none', color: 'white', backgroundColor: "rgb(243, 66, 140)",
                marginTop: '40px', marginLeft: "40px", padding: '5px 10px', fontSize: '15px',
                '&:hover': { color: 'white', backgroundColor: 'rgb(243, 66, 140)' }
            }} onClick={(e) => setAddProduct('Categories To Bag')}>Categories To Bag &gt; &gt;</Button>
            <br></br>
            <Button sx={{
                textTransform: 'none', color: 'white', backgroundColor: "rgb(243, 66, 140)",
                marginTop: '40px', marginLeft: "40px", padding: '5px 10px', fontSize: '15px',
                '&:hover': { color: 'white', backgroundColor: 'rgb(243, 66, 140)' }
            }} onClick={(e) => setAddProduct('Top Picks')}>Top Picks &gt; &gt;</Button>
            <br></br>
            <Button sx={{
                textTransform: 'none', color: 'white', backgroundColor: "rgb(243, 66, 140)",
                marginTop: '40px', marginLeft: "40px", padding: '5px 10px', fontSize: '15px',
                '&:hover': { color: 'white', backgroundColor: 'rgb(243, 66, 140)' }
            }} onClick={(e) => setAddProduct('Best Buys')}>Best Buys &gt; &gt;</Button>
            <br></br>
            <Button sx={{
                textTransform: 'none', color: 'white', backgroundColor: "rgb(243, 66, 140)",
                marginTop: '40px', marginLeft: "40px", padding: '5px 10px', fontSize: '15px',
                '&:hover': { color: 'white', backgroundColor: 'rgb(243, 66, 140)' }
            }} onClick={(e) => setAddProduct('Vendor Landing')}>Vendor Landing Page &gt; &gt;</Button>
        </>}
        {add_product === 'Slider Image' && <Slider_Image />}
        {add_product === 'Deal of The Day' && <Deal_Of_The_Day />}
        {add_product === 'Categories To Bag' && <Categories_To_Bag />}
        {add_product === 'Top Picks' && <Top_Picks />}
        {add_product === 'Best Buys' && <Best_Buys />}
        {add_product === 'Vendor Landing' && <Vendor_Landing />}
    </>)
}

export default Add_Product;