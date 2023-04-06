import { FC } from "react";
import { Td, Tr } from "@chakra-ui/react";
import { times } from "lodash";

interface Props {
  label: string;
  value: string;
  colCount: number;
}

export const SummaryTableRow: FC<Props> = ({ label, value, colCount }) => (
  <Tr>
    {times(colCount - 2).map((item) => (
      <Td key={item} />
    ))}
    <Td>{label}</Td>
    <Td>{value}</Td>
  </Tr>
);
