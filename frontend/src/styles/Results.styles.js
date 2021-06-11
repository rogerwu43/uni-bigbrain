import styled from 'styled-components';

import { BarChart } from 'recharts';

export const ResultsChart = styled(BarChart)`
  margin: auto;
`;

export const ResultsTable = styled.table`
  border-collapse: collapse;
  border-style: hidden;
  margin: auto;
  overflow: hidden;

  td {
    border: 1px solid lightgrey;
    max-width: 40vw;
    padding: 5px 10px;
    word-wrap: break-word;
  }
`;
