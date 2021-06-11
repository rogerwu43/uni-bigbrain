import PropTypes from 'prop-types';
import React from 'react';

import * as GS from '../styles/Global.styles';
import * as S from '../styles/Results.styles';

export default function ResultsTable ({ data }) {
  const children = data.map((val, i) => {
    return (
      <tr key={i + 1}>
        <td>{val.name}</td>
        <td>{val.points}</td>
      </tr>
    );
  });
  return (
    <>
      <GS.SubSectionTitle>Top {data.length} Players</GS.SubSectionTitle>
      <S.ResultsTable>
        <thead>
          <tr>
            <td><b>Name</b></td>
            <td><b>Points</b></td>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </S.ResultsTable>
      <GS.SubText>
        Points are calculated by Base_Points x Time_Left^1.5
        <br/>
        (points are worth more the sooner answers are picked)
      </GS.SubText>
    </>
  );
}

ResultsTable.propTypes = {
  data: PropTypes.array
}
