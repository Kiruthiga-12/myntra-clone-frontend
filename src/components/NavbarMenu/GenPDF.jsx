import { Document, Page, Text, Image } from '@react-pdf/renderer';
const GenPDF = (props) => {
    return (<>
        <Document>
            <Page size='A4' scale={1}>
                <Text style={{ fontWeight: "bold", marginLeft: "50px", marginTop: "50px", fontSize: "12px" }}>Tax Invoice</Text>
                <Text style={{ textAlign: "left", marginLeft: "50px", fontSize: "12px", marginTop: "30px" }}>Order Number : {props.orderno}</Text>
                <Text style={{ textAlign: "right", marginRight: "50px", fontSize: "12px" }}>Order Date : {new Date(props.orderdate).toLocaleString()}</Text>
                <Text style={{ textAlign: "right", marginRight: "50px", fontSize: "12px" }}>Delivered Date : {new Date(props.del).toLocaleString()}</Text>

                <Text style={{ fontWeight: "bold", marginLeft: "50px", marginTop: "20px", textDecoration: 'underline', fontSize: "12px" }}>User Address:</Text>
                <Text style={{ textAlign: "left", marginLeft: "50px", fontSize: "12px", marginTop: '20px' }}>{props.username}</Text>
                <Text style={{ textAlign: "left", marginLeft: "50px", fontSize: "12px" }}>{props.addr}</Text>
                <Text style={{ textAlign: "left", marginLeft: "50px", fontSize: "12px" }}>{props.town}</Text>
                <Text style={{ textAlign: "left", marginLeft: "50px", fontSize: "12px" }}>{props.pincode}</Text>

                <Text style={{ textAlign: "left", marginLeft: "50px", fontSize: "12px", marginTop: '30px' }}> Total Amount : Rs.{props.total_amount}</Text>

                <Text style={{ textAlign: "left", marginLeft: "50px", fontSize: "12px", marginTop: '30px' }}> Purchase Made on </Text>
                <Text style={{ textAlign: "left", marginLeft: "50px", fontSize: "12px", fontWeight: 'bold' }}> Myntra</Text>
                <Image src='../../Images/myntra_favicon.png' style={{ width: '200px', height: '100px', marginTop: "5px" }} />
            </Page>
        </Document >
    </>)
}
export default GenPDF;