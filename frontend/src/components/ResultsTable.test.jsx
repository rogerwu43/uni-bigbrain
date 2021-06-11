import { mount } from 'enzyme'
import React from 'React'
import renderer from 'react-test-renderer'
import ResultsTable from './ResultsTable'
import * as GS from '../styles/Global.styles';

describe('ResultsTable', () => {
  const data1 = [
    { name: 'Player 1', points: 100 },
    { name: 'Player 2', points: 200 },
    { name: 'Player 3', points: 300 },
    { name: 'Player 4', points: 400 },
    { name: 'Player 5', points: 500 }
  ]

  const data2 = [
    { name: 'Player 1', points: 100 },
    { name: 'Player 2', points: 200 },
    { name: 'Player 3', points: 300 },
  ]

  it('Generates a table with supplied data prop containing 5 results', () => {
    const table = mount(<ResultsTable data={data1} />);
    const row = table.find('tr');
    const cells = table.find('td');
    expect(table.find(GS.SubSectionTitle)).toHaveLength(1);
    expect(table.find(GS.SubSectionTitle).text()).toBe('Top 5 Players');
    expect(table).toHaveLength(1);
    expect(row).toHaveLength(6);
    expect(cells).toHaveLength(12);
    expect(cells.at(0).text()).toBe('Name');
    expect(cells.at(1).text()).toBe('Points');
    expect(cells.at(2).text()).toBe('Player 1');
    expect(cells.at(3).text()).toBe('100');
    expect(cells.at(4).text()).toBe('Player 2');
    expect(cells.at(5).text()).toBe('200');
    expect(cells.at(6).text()).toBe('Player 3');
    expect(cells.at(7).text()).toBe('300');
    expect(cells.at(8).text()).toBe('Player 4');
    expect(cells.at(9).text()).toBe('400');
    expect(cells.at(10).text()).toBe('Player 5');
    expect(cells.at(11).text()).toBe('500');
  });

  it('Generates a table with supplied data prop containing 3 results', () => {
    const table = mount(<ResultsTable data={data2} />);
    const row = table.find('tr');
    const cells = table.find('td');
    expect(table.find(GS.SubSectionTitle)).toHaveLength(1);
    expect(table.find(GS.SubSectionTitle).text()).toBe('Top 3 Players');
    expect(table).toHaveLength(1);
    expect(row).toHaveLength(4);
    expect(cells).toHaveLength(8);
    expect(cells.at(0).text()).toBe('Name');
    expect(cells.at(1).text()).toBe('Points');
    expect(cells.at(2).text()).toBe('Player 1');
    expect(cells.at(3).text()).toBe('100');
    expect(cells.at(4).text()).toBe('Player 2');
    expect(cells.at(5).text()).toBe('200');
    expect(cells.at(6).text()).toBe('Player 3');
    expect(cells.at(7).text()).toBe('300');
  });

  // snapshots
  it('renders correctly with a data prop containing 5 results', () => {
    const table = renderer.create(<ResultsTable data={data1} />).toJSON();
    expect(table).toMatchSnapshot();
  });

  it('renders correctly with a data prop containing 3 results', () => {
    const table = renderer.create(<ResultsTable data={data2} />).toJSON();
    expect(table).toMatchSnapshot();
  });
});
