import React from 'react';
import { TextInput, NativeSelect } from '@mantine/core';
import { Search } from 'tabler-icons-react';

// type Props = {}

export default function Home() {
  return (
    <>
    <div className='search'>
    <TextInput
      placeholder="Search for a country..."
      icon={<Search size={14} />}
    />
    <NativeSelect
      data={['Africa', 'America', 'Asia', 'Europe', 'Oceania']}
      placeholder="Filter by region"
    />
    </div>
    <div className="countries"></div>
    </>
  )
}