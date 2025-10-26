import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/material";

export default function AttractionsFAQList() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Stack
      width={"100%"}
      flexDirection={"row"}
      justifyContent={"space-between"}
    >
      <Stack width={"60%"}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              component="span"
              sx={{ width: "100%", flexShrink: 0 }}
              className="bold-text-medium"
            >
              How do I book a ticket?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Select a date and time. Choose the number of tickets. Click
              through to the next page and enter your personal details. After
              entering your personal details, select your payment method and
              enter your payment details. Once you’ve entered your payment
              details successfully, you will be redirected to your ticket page,
              where you can check the status and details of your reservations.
              You'll receive a confirmation email once the reservation is
              confirmed with the attraction operator. This could take some time
              based on the supplier. You can view your tickets in your
              confirmation email, or in the Booking & Trips section of your
              account.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography
              component="span"
              sx={{ width: "100%", flexShrink: 0 }}
              className="bold-text-medium"
            >
              When do I pay?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Booking.com collects payment on behalf of the attraction operator
              when you book your ticket.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography
              component="span"
              sx={{ width: "100%", flexShrink: 0 }}
              className="bold-text-medium"
            >
              How do digial tickets work?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Each digital ticket contains a unique code. This is usually a QR
              or numerical code, but could be something else and can be found on
              your ticket or the PDF sent to you. If your digital ticket
              contains a barcode or QR code, give it to the staff at the
              attraction's entrance or ticket collection point so they can scan
              it. For those with numerical codes, just show your ticket to staff
              for verification.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography
              component="span"
              sx={{ width: "100%", flexShrink: 0 }}
              className="bold-text-medium"
            >
              Can I cancel or modify my tickets?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You’ll need to check the policy on the specific ticket you’re
              booking. Last minute bookings might no longer have free
              cancellation available.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              component="span"
              sx={{ width: "100%", flexShrink: 0 }}
              className="bold-text-medium"
            >
              When I will get my free cancellation refund?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              After you cancel, we'll immediately issue a full refund. Depending
              on your bank or payment provider, it can take 3-10 days for you to
              be refunded to your original payment method.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  );
}
