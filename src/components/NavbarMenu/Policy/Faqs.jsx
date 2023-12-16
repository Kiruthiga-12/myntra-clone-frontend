import { Component } from "react";
import { Box, Button, Typography, ListItemButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Link } from 'react-router-dom';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import { connect } from 'react-redux';
import { setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
class Faqs extends Component {
    constructor() {
        super();
        this.state = {
            counter: 1
        }
    }
    componentDidMount() {
        document.title = 'FAQS';
        this.props.setNavBar('navbar');
        this.props.setFooter('footer');
    }
    async changeState(num) {
        for (let i = 1; i <= 5; i++) {
            if (i == Number(num)) {
                document.getElementById(num).style.borderRight = '8px solid goldenrod';
                this.setState({ counter: i })
                document.getElementById(num).childNodes[1].style.color = 'goldenrod';
                document.getElementById(num).childNodes[1].style.fontWeight = 'bold';
            }
            else {
                document.getElementById(i).style.borderRight = 'none';
                document.getElementById(i).childNodes[0].style.color = 'black';
                document.getElementById(i).childNodes[1].style.color = 'black';
                document.getElementById(i).childNodes[1].style.fontWeight = 'normal';
            }
        }

    }
    componentDidUpdate() {
        document.title = 'FAQS';
    }
    render() {

        return (
            <>
                <Box sx={{ marginLeft: '250px', width: '73%', marginTop: '150px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h4' sx={{ flex: 9 }}>Frequently Asked Questions</Typography>
                        <Typography sx={{ flex: 3, color: 'grey', fontWeight: 'bold' }}>Still need help?
                            <Button disableTouchRipple variant='outlined' component={Link} to='/contactus'
                                sx={{ marginLeft: '20px', border: '1px solid grey', backgroundColor: 'transparent', '&:hover': { border: '1px solid grey', backgroundColor: 'transparent' } }}>CONTACT US</Button></Typography>
                    </Box>
                    <div style={{ borderTop: '1px solid lightgrey', marginTop: '10px', backgroundColor: 'grey' }}></div>
                    <Box sx={{ display: 'flex', marginTop: '70px' }}>
                        <Box sx={{ flex: 4, borderRight: '1px solid grey' }}>
                            <ListItemButton id='1' href='#one' disableTouchRipple sx={{
                                borderRight: '8px solid goldenrod',
                                display: 'flex', alignItems: 'center',
                                '&:hover': { backgroundColor: 'transparent' }
                            }} onClick={(e) => this.changeState(e.currentTarget.id)}>
                                {this.state.counter === 1 && <StarRateIcon sx={{ fontSize: '30px', color: 'goldenrod' }} />}
                                {this.state.counter !== 1 && <StarBorderOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />}
                                < Typography sx={{ marginLeft: '20px', fontSize: '20px', fontWeight: 'bold', color: 'goldenrod' }}>Top Queries</Typography>
                            </ListItemButton>
                            <ListItemButton id='2' href='#two' disableTouchRipple sx={{
                                display: 'flex', alignItems: 'center',
                                '&:hover': { backgroundColor: 'transparent' }
                            }} onClick={(e) => this.changeState(e.currentTarget.id)}>
                                {this.state.counter === 2 && <StarRateIcon sx={{ fontSize: '30px', color: 'goldenrod' }} />}
                                {this.state.counter !== 2 && <StarBorderOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />}
                                <Typography sx={{ marginLeft: '20px', fontSize: '20px' }}>Terms and Conditions</Typography>
                            </ListItemButton>
                            <ListItemButton id='3' href='#three' disableTouchRipple sx={{
                                display: 'flex', alignItems: 'center', color: 'black', borderRight: 'none',
                                '&:hover': { backgroundColor: 'transparent', color: 'black' }
                            }} onClick={(e) => this.changeState(e.currentTarget.id)}>
                                {this.state.counter === 3 && <StarRateIcon sx={{ fontSize: '30px', color: 'goldenrod' }} />}
                                {this.state.counter !== 3 && <StarBorderOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />}
                                <Typography sx={{ marginLeft: '20px', fontSize: '20px' }}>Social Carnival Event</Typography>
                            </ListItemButton>
                            <ListItemButton id='4' href='#four' disableTouchRipple sx={{
                                display: 'flex', alignItems: 'center', color: 'black', borderRight: 'none',
                                '&:hover': { backgroundColor: 'transparent', color: 'black' }
                            }} onClick={(e) => this.changeState(e.currentTarget.id)}>
                                {this.state.counter === 4 && <StarRateIcon sx={{ fontSize: '30px', color: 'goldenrod' }} />}
                                {this.state.counter !== 4 && <StarBorderOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />}
                                <Typography sx={{ marginLeft: '20px', fontSize: '20px' }}>Shipping,Order Tracking & Delivery</Typography>
                            </ListItemButton>
                            <ListItemButton id='5' href='#five' disableTouchRipple sx={{
                                display: 'flex', alignItems: 'center', color: 'black', borderRight: 'none',
                                '&:hover': { backgroundColor: 'transparent', color: 'black' }
                            }} onClick={(e) => this.changeState(e.currentTarget.id)}>
                                {this.state.counter === 5 && <StarRateIcon sx={{ fontSize: '30px', color: 'goldenrod' }} />}
                                {this.state.counter !== 5 && <StarBorderOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />}
                                <Typography sx={{ marginLeft: '20px', fontSize: '20px' }}>Cancellations & Modifications</Typography>
                            </ListItemButton>
                        </Box>
                        <Box sx={{ flex: 9, paddingLeft: '60px' }}>
                            {/* section1 */}
                            <Box id='one'>
                                <Typography variant='h4'>Top Queries</Typography>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary >
                                        <Typography sx={{ fontWeight: 'bold' }}>Why are there different prices for the same product? Is it legal?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Myntra is an online marketplace platform that enables independent sellers to sell their products to buyers. The prices are solely decided by the sellers, and Myntra does not interfere in the same. There could be a possibility that the same product is sold by different sellers at different prices. Myntra rightfully fulfils all legal compliances of onboarding multiple sellers on its forum as it is a marketplace platform.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary >
                                        <Typography sx={{ fontWeight: 'bold' }}>How will I identify a genuine appointment letter?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Please beware of the fraudulent individuals/agencies that are enticing job seekers by promising them career opportunities at Myntra in lieu of 1.) recruitment fee 2.) processing fee 3.) security deposit 4.) software or equipment charges 5.) on-boarding charges etc. Please be cautious that, Myntra and its recruitment partners never ask for any fee in exchange for an offer letter or interview calls. All offer related communications are sent from an official Myntra email id only.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary >
                                        <Typography sx={{ fontWeight: 'bold' }}>Why will 'My Cashback' not be available on Myntra?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>To make your shopping experience easier and simpler, 'My Cashback' will be replaced by PhonePe. PhonePe wallet can be used on Myntra and other PhonePe partners. To use your PhonePe balance, you will have to activate/verify your PhonePe account.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary >
                                        <Typography sx={{ fontWeight: 'bold' }}>How do I cancel the order, I have placed?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Order can be canceled till the same is out for delivery. Note: This may not be applicable for certain logistics partner. You would see an option to cancel within 'My Orders' section under the main menu of your App/Website/M-site then select the item or order you want to cancel. In case you are unable to cancel the order from'My Orders' section, you can refuse it at the time of delivery and refund will be processed into the source account, if order amount was paid online.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary >
                                        <Typography sx={{ fontWeight: 'bold' }}>How do I create a Return Request?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>You can create a Return in three simple steps
                                            Tap on MyOrders
                                            Choose the item to be Returned
                                            Enter details requested and create a return request</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary >
                                        <Typography sx={{ fontWeight: 'bold' }}>Where should I self-ship the Returns?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>You can send the return to any one of the following returns processing facilities listed below. Please ensure that you specify the name of the seller you purchased the products from (You can find the seller name on your order invoice) and dispatch the package to the address listed below. Kindly do not send it to any other address as the return package would not be treated as accepted.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary >
                                        <Typography sx={{ fontWeight: 'bold' }}>I have accumulated Myntra Points in my account. How can I redeem them?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>To redeem Myntra Points, you will have to continue shopping with us on App/M-site/Website. In case, you don’t have access to the App/Website or M-site, don’t worry, your Myntra Points are safe with us, whenever you get access of these Platforms in future, you can redeem the same (unless points have not expired).</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <br></br>
                            <br></br>
                            {/* section2 */}
                            <Box id='two'>
                                <Typography variant='h4' sx={{ marginTop: '20px' }}>Terms and Conditions</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '10px' }}>
                                    <Typography sx={{ flex: 10 }}>You can view the Terms and Conditions here.</Typography>
                                    <Button variant='outlined' sx={{
                                        flex: 2,
                                        border: '1px solid grey',
                                        '&:hover': { border: '1px solid grey', backgroundColor: 'transparent' }
                                    }}>VIEW T&C</Button>
                                </Box>
                                <br></br>
                                <br></br>

                            </Box>
                            {/* section 3 */}
                            <Box id='three'>
                                <Typography variant='h4' sx={{ marginTop: '20px' }}>Social Carnival Event</Typography>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary >
                                        <Typography sx={{ fontWeight: 'bold' }}>What is Myntra Social Carnival?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Myntra Social Carnival is a social-commerce event to be held on 11th Nov, ‘21 exclusively on Myntra mobile app (“Platform”), in which fashion and beauty content creators will feature their looks and chosen products on Myntra Studio (“Studio”) and Myntra-Live (“M-Live”). Along with this, Myntra Fashion Superstar (“MFS”) Season 3 would also premiere on Studio on the same day.

                                            Customers can share their feedback by writing to support_socialcarnival@myntra.com</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary >
                                        <Typography sx={{ fontWeight: 'bold' }}>What is Myntra Studio, and how can I shop through Myntra Studio ?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Myntra Studio is an on-demand influencer-led content platform where you can view content (images/videos/polls/quizzes) posted by influencers and brands. You can also shop for select products featured on the Studio posts.

                                            You can access Studio by clicking on “Studio” icon in the bottom navigation pane on the Myntra app. To shop for products featured on the post (or similar products), click on “Shop Products” on the bottom left of the post.

                                            You can either wishlist products by clicking on the wishlist (heart) button or go to the detailed product page by clicking on the image of the product. From the product page, you can add the product to your cart, and check out.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                        <Typography sx={{ fontWeight: 'bold' }}>What is Myntra Live, and how do I shop through Myntra Live?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Myntra Live is a live shopping construct where fashion influencers will be livestreaming and featuring products and looks, which can be bought by the customers. Users can ask questions in comments, wishlist and/or shop the products being shown by the influencers in real time.

                                            The ongoing live streams can be accessed at any point of time by going to Studio, and clicking within the “live shopping with top influencers” widget. Once in the live stream, you can check the featured products in the product carousel at the bottom of the page. On clicking any of the products, a mini product page opens up where you can choose the size you want to order. You can then go to your cart to check out by clicking on “Go to Bag”.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <br></br>
                            <br></br>
                            {/* section 4 */}
                            <Box id='four'>
                                <Typography variant='h4' sx={{ marginTop: '20px' }}>Shipping, Order Tracking & Delivery</Typography>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                        <Typography sx={{ fontWeight: 'bold' }}>What is Myntra's Convenience Fee?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>A Convenience Fee of Rs. 99/- will be applicable to the orders under Rs. 799/-, and Rs.69/- will be applicable for the orders with only personal care items under 499/-.

                                            If the order is cancelled, lost or un - delivered to your preferred location, we will refund the complete order amount including the convenience fee, if paid online.

                                            If you return an order delivered to you, order Convenience Fee will not be refunded. However, if you self - ship your returns, we will reimburse self - shipment charges based on Myntra 's Returns Policy. For accounts whose return behavior violates our fair usage policy, Convenience fee will be non - refundable irrespective of order value.


                                            *Order value is calculated after applying discounts/VAT/GST or any other applicable charges.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                        <Typography sx={{ fontWeight: 'bold' }}>What is Myntra’s Fair Usage Policy?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>We always strive hard to provide the best experience to our customers. However, we have noticed that few accounts abuse our customer friendly return policy. These accounts typically return most of the items bought or choose to not accept our shipments. Hence, our regular customers are deprived of the opportunity to buy these items. To protect the rights of our customers, we reserve the right to collect a Convenience fee for all orders and disable the cash-on-delivery option for accounts that have a high percentage of returns and shipments not accepted by the value of orders placed.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <br></br>
                            <br></br>
                            {/* section5 */}
                            <Box id='five'>
                                <Typography variant='h4' sx={{ marginTop: '20px' }}>Cancellations & Modifications</Typography>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                        <Typography sx={{ fontWeight: 'bold' }}>What is Myntra's Cancellation Policy?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>You can now cancel an order when it is in packed/shipped status, as long as the cancel option is available on App/Website/M-site. This includes items purchased on sale also. Any amount paid will be credited into the same payment mode using which the payment was made</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion sx={{ marginTop: '5px' }}>
                                    <AccordionSummary sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                        <Typography sx={{ fontWeight: 'bold' }}>How do I cancel my Order?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Tap on “My Orders” section under the main menu of your App/Website/M-site and then select the item or order you want to cancel</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Box>
                    </Box>
                </Box >
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(Faqs);