import React from 'react';
import PropTypes from 'prop-types';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

import * as GS from '../styles/Global.styles';
import * as S from '../styles/Results.styles';

export default function ResultsCharts ({ data }) {
  return (
    <div>
      <GS.SubSectionTitle>Percentage Correct</GS.SubSectionTitle>
      <S.ResultsChart
        width={300}
        height={250}
        data={data}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='question' />
        <YAxis tickFormatter={(tick) => `${tick}%`} />
        <Tooltip />
        <Bar dataKey='Percentage Correct' fill='#8884d8'/>
      </S.ResultsChart>
      <GS.SubSectionTitle>Average Time Taken</GS.SubSectionTitle>
      <S.ResultsChart
        width={300}
        height={250}
        data={data}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='question' />
        <YAxis/>
        <Tooltip />
        <Bar dataKey='Average Time Taken' fill='#8884d8' />
      </S.ResultsChart>
    </div>
  );
}

ResultsCharts.propTypes = {
  data: PropTypes.array
}
