import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "./../../hooks/useAuth";
import { styles } from "./invoice";

const InvoicePDF = ({ invoice = {}, user }) => (
  <Document pageLayout="singlePage">
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.spaceY}>
          <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
          <Text>
            Invoice - INV-2025-
            {invoice?.transactionId
              ?.substring(invoice.transactionId.length - 3)
              .toUpperCase()}
          </Text>
        </View>
        <View style={[styles.spaceY, styles.textRight]}>
          <Text style={styles.textBold}>Pharmacy Care</Text>
          <Text>123, RK Guho Road</Text>
          <Text>Mymensingh, Bangladesh</Text>
        </View>
      </View>
      <View style={styles.spaceY}>
        <Text style={[styles.textBold, styles.billTo]}>Bill To</Text>
        <Text>{user?.displayName}</Text>
        <Text>Client Address</Text>
        <Text>City, State ZIP</Text>
      </View>
      <Table style={styles.table}>
        <TH style={styles.tableHeader}>
          <TD style={styles.td}>Description</TD>
          <TD style={styles.td}>Quantity</TD>
          <TD style={styles.td}>Unit Price</TD>
          <TD style={styles.td}>Total</TD>
        </TH>
        {invoice?.ordered_items?.map((item, i) => (
          <TR key={i}>
            <TD style={styles.td}>{item.name}</TD>
            <TD style={styles.td}>{item.quantity}</TD>
            <TD style={styles.td}>{item.unitPrice}</TD>
            <TD style={styles.td}>{item.totalPrice}</TD>
          </TR>
        ))}
      </Table>
      <View style={{ display: "flex", alignItems: "flex-end" }}>
        <View style={{ minWidth: "200px" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text>Subtotal</Text>
            <Text>${invoice.totalOrderPrice}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

function Invoice() {
  const { invoiceId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: invoice = {} } = useQuery({
    queryKey: ["invoice"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/invoice/${invoiceId}`);
      return data;
    },
  });
  return (
    <div className="flex flex-col justify-center items-center w-full h-[500px] max-w-3xl mx-auto my-10">
      <PDFViewer width={"100%"} height={"100%"}>
        <InvoicePDF user={user} invoice={invoice} />
      </PDFViewer>
      <div className="mt-8">
        <PDFDownloadLink document={<InvoicePDF />} fileName="invoice.pdf">
          <Button>Download PDF</Button>
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default Invoice;
