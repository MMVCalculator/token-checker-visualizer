import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';

interface Item {
  picture: string;
  nameItem: string;
  address: string;
}

const items: Item[] = [
  {
    picture: '/empty-bottle.png',
    nameItem: 'Empty Bottle',
    address: '0x5BF5eea0CE540db3986fa58ee17D68510b7c2FB',
  },
  {
    picture: '/rag.png',
    nameItem: 'Rag',
    address: '0x1F1469b6c7002fCe867c6b518aa2C093e16fe27',
  },
  {
    picture: '/tool-fragment.png',
    nameItem: 'Tool Fragment',
    address: '0x67230Ca27C123a5bE24fb0ba1846f871959fa05',
  },
];

const fetchTokenAmount = async (address: string) => {
  const response = await fetch(`https://www.bkcscan.com/api/v2/tokens/${address}`);
  if (!response.ok) {
    throw new Error('Failed to fetch token amount');
  }
  return response.json();
};

const ItemTable = () => {
  const [selectedAddress, setSelectedAddress] = React.useState<string | null>(null);

  const { data: tokenAmount, isLoading, error, refetch } = useQuery({
    queryKey: ['tokenAmount', selectedAddress],
    queryFn: () => fetchTokenAmount(selectedAddress!),
    enabled: !!selectedAddress,
  });

  const handleCheckAmount = (address: string) => {
    setSelectedAddress(address);
    refetch();
  };

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch token amount. Please try again.',
        variant: 'destructive',
      });
    }
  }, [error]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Picture</TableHead>
          <TableHead>Name Item</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Max total supply</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.address}>
            <TableCell>
              <img src={item.picture} alt={item.nameItem} className="w-12 h-12 object-contain" />
            </TableCell>
            <TableCell>{item.nameItem}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>
              <Button
                onClick={() => handleCheckAmount(item.address)}
                disabled={isLoading && selectedAddress === item.address}
              >
                {isLoading && selectedAddress === item.address
                  ? 'Loading...'
                  : tokenAmount && selectedAddress === item.address
                  ? tokenAmount.totalSupply
                  : 'ตรวจสอบจำนวน'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ItemTable;