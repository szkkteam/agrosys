import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled , { css } from 'styled-components'
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts'

import { 
    WidgetLight,
    SimpleProgress
} from 'farmApp/components'

import {
    Grid,
    Typography
} from '@material-ui/core'

const Flex = styled.div`
    width: 100%;
    display: flex;
    padding-bottom: 8px;

    ${({active}) => active ?`
        & p {
            font-weight: 600;
        }
    ` : `
        & p {
            font-weight: 400;
        }
    `}
`

const Connector = styled.div`
    ${({theme}) => `
        flex-grow: 1;
        margin: auto 10px 12px 10px;
        border-bottom: 1px solid ${theme.palette.text.hint};
    `}
    
`

const ColoredTypography = styled(({color, ...props}) => <Typography {...props}/>)`
    ${({theme, color}) => `
        color: ${color};
    `}
`


  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        
        
        
      </g>
    );
  };

const AreaLabel = ({
    active=false,
    name,
    area,
    percentage,
    fill,
    onHover
}) => {
    return (
        <Flex active={active} onMouseEnter={onHover}>
            <ColoredTypography color={fill} variant="body1">
                {name}
            </ColoredTypography>
            <Connector />
            <ColoredTypography color={fill} variant="body1">
                {`${percentage.toFixed(2)}% | ${area} ha`}
            </ColoredTypography>
        </Flex>
    )
}



const CropsByArea = ({

}) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const data = [
        { name: 'Őszi búza', value: 400 },
        { name: 'Kukorica', value: 300 },
        { name: 'Repce', value: 300 },
        { name: 'Tavaszi búza', value: 200 },
        { name: 'Lucerna', value: 800 },
        { name: 'Bíborhere', value: 400 },
    ];
    const total = data.reduce((prev, curr) => {
        return prev + curr.value;
    }, 0)

    const handleSectorHover = (_, index) => {
        setActiveIndex(index)
    }

    const handleLabelHover = (index) => () => {
        setActiveIndex(index)
    }
    
    return (
        <WidgetLight
            title="Crops by area"
        >
            <Grid container>
                <Grid item xs={6} sm={4}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                fill="#8884d8"
                                dataKey="value"
                                onMouseEnter={handleSectorHover}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item xs={6} sm={8}>
                    {data.map(({name, value}, i) => (
                        <AreaLabel key={i}
                            active={i===activeIndex}
                            name={name}
                            area={value}
                            percentage={value / total * 100}
                            fill={COLORS[i % COLORS.length]}
                            onHover={handleLabelHover(i)}
                        />
                    ))}
                    
                    
                </Grid>
            </Grid>
                       
        </WidgetLight>
        
    )
}

CropsByArea.propTypes = {

}

export default CropsByArea