import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/material";
import { PartnerProperty } from "../../../types/partnerInput/partnerProperty";

interface FAQListProps {
  partnerProperty?: PartnerProperty | null;
}

export default function FAQList({ partnerProperty }: FAQListProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const name = partnerProperty?.propertyName ?? "this property";
  const city = partnerProperty?.propertyCity ?? "";
  const checkIn = partnerProperty?.checkInTimeFrom ?? "14:00";
  const checkOut = partnerProperty?.checkOutTimeFrom ?? "11:00";
  const breakfast = partnerProperty?.breakfastIncluded;
  const parking = partnerProperty?.parkingIncluded;
  const pets = partnerProperty?.allowPets;
  const children = partnerProperty?.allowChildren;

  const faqs = [
    {
      q: `What are the check-in and check-out times at ${name}?`,
      a: `Check-in is from ${checkIn} and check-out is until ${checkOut}.`,
    },
    {
      q: `Does ${name} offer breakfast?`,
      a: breakfast
        ? `Yes, ${name} offers breakfast for guests.`
        : `No, breakfast is not included. However, there may be restaurants nearby.`,
    },
    {
      q: `Is parking available at ${name}?`,
      a: parking
        ? `Yes, free parking is available at ${name}.`
        : `Unfortunately, parking is not available at this property.`,
    },
    {
      q: `Are pets allowed at ${name}?`,
      a: pets
        ? `Yes, pets are welcome at ${name}.`
        : `No, pets are not allowed at this property.`,
    },
    {
      q: `Is ${name} suitable for families with children?`,
      a: children
        ? `Yes, ${name} welcomes children of all ages.`
        : `This property is for adults only and does not accept children.`,
    },
    {
      q: `How far is ${name} from the city centre?`,
      a: city
        ? `${name} is located in ${city}. Please check the map on the property page for exact distance to the city centre.`
        : `Please check the map on the property page for location details.`,
    },
  ];

  const half = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, half);
  const rightFaqs = faqs.slice(half);

  return (
    <Stack sx={{ width: "100%", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: { xs: 0, md: 0 } }}>
      <Stack sx={{ width: { xs: "100%", md: "49%" } }}>
        {leftFaqs.map((faq, i) => (
          <Accordion
            key={`left-${i}`}
            expanded={expanded === `left-${i}`}
            onChange={handleChange(`left-${i}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" sx={{ width: "100%" }} className="bold-text-medium">
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
      <Stack sx={{ width: { xs: "100%", md: "49%" } }}>
        {rightFaqs.map((faq, i) => (
          <Accordion
            key={`right-${i}`}
            expanded={expanded === `right-${i}`}
            onChange={handleChange(`right-${i}`)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" sx={{ width: "100%" }} className="bold-text-medium">
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  );
}
