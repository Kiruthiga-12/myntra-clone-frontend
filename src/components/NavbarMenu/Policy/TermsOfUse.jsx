import { Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { connect } from 'react-redux';
import { setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
const TermsOfUse = (props) => {
    useEffect(() => {
        document.title = 'Terms Of Use';
        props.setNavBar('navbar');
        props.setFooter('footer');
    }, [])
    return (
        <>
            <Typography variant='h5' sx={{ marginTop: '200px', textAlign: 'center' }}>MYNTRA: TERMS OF USE</Typography>
            <Box sx={{ marginTop: '20px', marginLeft: '100px', width: '85%' }}>


                <Typography sx={{ color: 'grey', marginTop: '20px' }}>
                    Welcome to Myntra.This document is an electronic record in terms of Information Technology Act, 2000 and published in accordance with the provisions of Rule 3 ) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of Myntra marketplace platform - www.myntra.com (hereinafter referred to as "Platform")

                    The Platform is owned by Myntra Designs Private Limited, having its registered office at Buildings Alyssa, Begonia and Clover situated in Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Varthur Hobli, Bengaluru – 560103, India and its branch office at Plot 82 A - 2nd and 3rd Floor, Sector 18 Gurugram Haryana, India.

                    Your use of the Myntra and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Myntra including the applicable policies which are incorporated herein by way of reference. By mere use of the Myntra, You shall be contracting with Myntra Designs Private Limited, the owner of the Platform. These terms and conditions including the policies constitute Your binding obligations, with Myntra.

                    For the purpose of these Terms of Use, wherever the context so requires "You" or "User" shall mean any natural or legal person who has agreed to become a buyer on Platform by providing data while registering on the Platform as Registered User. The term "Myntra","We","Us","Our" shall mean Myntra Designs Private Limited and its affiliates.

                    When You use any of the services provided by Us through the Platform, including but not limited to, (e.g. Product Reviews, Seller Reviews), You will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they shall be deemed to be incorporated into this Terms of Use and shall be considered as part and parcel of this Terms of Use. We reserve the right, at Our sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time without any prior written notice to You. You shall ensure to review these Terms of Use periodically for updates/changes. Your continued use of the Platform following the posting of changes will mean that You accept and agree to the revisions. As long as You comply with these Terms of Use, We grant You a personal, non-exclusive, non-transferable, limited privilege to enter and use the Platform. By impliedly or expressly accepting these Terms of Use, You also accept and agree to be bound by Myntra Policies including but not limited to Privacy Policy as amended from time to time.
                </Typography>
                {/* User Account, Password & Security */}
                <Typography variant='body1' sx={{ marginTop: '20px', fontSize: '19px', fontWeight: 'bold' }}>1. User Account, Password, and Security:</Typography>
                <Typography sx={{ color: 'grey', marginTop: '20px' }}>
                    If You use the Platform, You shall be responsible for maintaining the confidentiality of your Display Name and Password and You shall be responsible for all activities that occur under your Display Name and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Platform.

                    You agree to

                    immediately notify Myntra of any unauthorized use / breach of your password or account and

                    ensure that you exit from your account at the end of each session.
                </Typography>
                {/* Services Offered */}
                <Typography variant='body1' sx={{ marginTop: '20px', fontSize: '19px', fontWeight: 'bold' }}>2. Services Offered:</Typography>
                <Typography sx={{ color: 'grey', marginTop: '20px' }}>
                    Myntra provides a number of Internet-based services through the Platform. One such Service enables Users to purchase original merchandise such as clothing, footwear and accessories from various fashion and lifestyle brands (collectively, "Products"). The Products can be purchased through the Platform through various methods of payments offered. The sale/purchase of Products shall be additionally governed by specific policies of sale, like cancellation policy, exchange policy, return policy, etc. (which are found on the FAQ tab on the Platform and all of which are incorporated here by reference). It is clarified that at the time of creating a return request, users are required to confirm (via a check box click) that the product being returned is unused and has the original tags intact. If the product returned by the user is used, damaged or if the original tags are missing, the user’s return request shall be declined, and the said product shall be re-shipped back to the customer. In the event that the return request is declined, the user shall not be eligible for a refund, and Myntra assumes no liability in this regard. Further, in the event that the user fails to accept the receipt of the said re-shipped product, the user shall continue to be not eligible for a refund, and Myntra assumes no liability with respect to the return or refund for the said re-shipped product. In addition, these Terms of Use may be further supplemented by Product specific conditions, which may be displayed with that Product.

                    Myntra does not warrant that Product description or other content on the Platform is accurate, complete, reliable, current, or error-free and assumes no liability in this regard.
                </Typography>
                {/* Disclaimer */}
                <Typography variant='body1' sx={{ marginTop: '20px', fontSize: '19px', fontWeight: 'bold' }}>3.Disclaimer of Warranties and Liability</Typography>
                <Typography sx={{ color: 'grey', marginTop: '20px' }}>
                    All the materials and products (including but not limited to software) and services, included on or otherwise made available to You through Platform are provided on "as is" and "as available" basis without any representation or warranties, express or implied except otherwise specified in writing. Without prejudice to the forgoing paragraph, Myntra does not warrant that: Platform will be constantly available, or available at all or The information on Platform is complete, true, accurate or non-misleading.

                    All the Products sold on Platform are governed by different state laws and if Seller is unable to deliver such Products due to implications of different state laws, Seller will return or will give credit for the amount (if any) received in advance by Seller from the sale of such Product that could not be delivered to You. You will be required to enter a valid phone number while placing an order on the Platform. By registering Your phone number with us, You consent to be contacted by Us via phone calls and/or SMS notifications, in case of any order or shipment or delivery related updates. We will not use your personal information to initiate any promotional phone calls or SMS.
                </Typography>
                {/* selling */}
                <Typography variant='body1' sx={{ marginTop: '20px', fontSize: '19px', fontWeight: 'bold' }}>4.Selling:</Typography>
                <Typography sx={{ color: 'grey', marginTop: '20px' }}>
                    As a registered seller, you are allowed to list item(s) for sale on the Platform in accordance with the Policies which are incorporated by way of reference in this Terms of Use. You must be legally able to sell the item(s) you list for sale on the Platform. You must ensure that the listed items do not infringe upon the intellectual property, trade secret or other proprietary rights or rights of publicity or privacy rights of third parties. Listings may only include text descriptions, graphics and pictures that describe your item for sale. All listed items must be listed in an appropriate category on the Platform. All listed items must be kept in stock for successful fulfilment of sales. The listing description of the item must not be misleading and must describe actual condition of the product. If the item description does not match the actual condition of the item, you agree to refund any amounts that you may have received from the Buyer. You agree not to list a single product in multiple quantities across various categories on the Platform. Myntra reserves the right to delete such multiple listings of the same product listed by you in various categories.

                    We may provide you alternation services (limited to alteration of length, alteration of the waist size) for the garments purchased by You from Us. This service shall be free of cost and no amount would be collected from You for such alteration. However, a nominal fee as mentioned by Myntra at the time of creating the alteration request (inclusive of service tax) would be applicable as convenience charge towards pick up and drop of the garments or towards tailor visit (wherever applicable).
                </Typography>
                {/* E-Platform */}
                <Typography variant='body1' sx={{ marginTop: '20px', fontSize: '19px', fontWeight: 'bold' }}>5.E-Platform for Communication:</Typography>
                <Typography sx={{ color: 'grey', marginTop: '20px' }}>
                    You agree, understand and acknowledge that Myntra is an online platform that enables you to purchase products listed on the Platform at the price indicated therein at any time. You further agree and acknowledge that Myntra is only a facilitator and is not and cannot be a party to or control in any manner any transactions on Myntra.
                </Typography>
            </Box>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(TermsOfUse);