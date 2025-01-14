import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import { styles } from "./invoice";
import { Button } from "@/components/ui/button";

const InvoicePDF = () => (
  <Document pageLayout="singlePage">
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.spaceY}>
          <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
          <Text>Invoice -INV-2025-001</Text>
        </View>
        <View style={[styles.spaceY, styles.textRight]}>
          <Text style={styles.textBold}>Pharmacy Care</Text>
          <Text>123, RK Guho Road</Text>
          <Text>Mymensingh, Bangladesh</Text>
        </View>
      </View>
      <View style={styles.spaceY}>
        <Text style={[styles.textBold, styles.billTo]}>Bill To</Text>
        <Text>Client Name</Text>
        <Text>Client Address</Text>
        <Text>City, State ZIP</Text>
      </View>
      <Table style={styles.table}>
        <TH style={styles.tableHeader}>
          <TD style={styles.td}>Description</TD>
          <TD style={styles.td}>Quantity</TD>
          <TD style={styles.td}>Uni Price</TD>
          <TD style={styles.td}>Total</TD>
        </TH>
        <TR>
          <TD style={styles.td}>Data 1</TD>
          <TD style={styles.td}>Data 1</TD>
          <TD style={styles.td}>Data 1</TD>
          <TD style={styles.td}>Data 2</TD>
        </TR>
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
            <Text>Total</Text>
            <Text>$450</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

function Invoice() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[500px] max-w-3xl mx-auto my-10">
      <PDFViewer width={"100%"} height={"100%"}>
        <InvoicePDF />
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
