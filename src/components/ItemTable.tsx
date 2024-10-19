import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';

interface Item {
  nameItem: string;
  address: string;
}

const items: Item[] = [
  { nameItem: 'Empty Bottle', address: '0x5BF5eea0CE540db3986fa58ee17D68510b7c2FB' },
  { nameItem: 'Rag', address: '0x1F1469b6c7002fCe867c6b518aa2C093e16fe27' },
  { nameItem: 'Tool Fragment', address: '0x67230Ca27C123a5bE24fb0ba1846f871959fa05' },
  { nameItem: 'Scrap Metal', address: '0x0Cd968a09E8D43E08c1f0F9c848b7A8e3bc89392' },
  { nameItem: 'Leather Piece', address: '0x15aa87eb74069d3800f8e75A93FC04fda79AA24d' },
  { nameItem: 'Runic Essence', address: '0xBF2eCE989D892018a1c338F38872Ca20A3813aff' },
  { nameItem: 'Lucent Tear', address: '0x8fB2788EDc797cDF52A84e4A4291B82619200073' },
  { nameItem: 'Mystic Oil', address: '0xa224371188Efc777E0C62F32Fc45721eea0b8816' },
  { nameItem: 'Arcane Powder', address: '0x136609236fadE78113d1690D6546428b1DEd8293' },
  { nameItem: 'Noxious Fang', address: '0xB0366C3a7a174c299F1E8402Bf16630cec26b717' },
  { nameItem: 'Golem Heart', address: '0xcC82FBCeD131714150DDe300450ed72D47283C1d' },
  { nameItem: 'Treant Spirit', address: '0x2260ed1B575a3e0e835f0c35e2E2Ad3747570a78' },
  { nameItem: 'Living Branch', address: '0xDF5a0E8db593EbFbf6D50E00C0e69dd3df008e53' },
  { nameItem: 'Tainted Leaf', address: '0x3534EFDde4D0d69c8e863A0528BE4729ac041FBf' },
  { nameItem: 'Floral Horn', address: '0x2Ef170237AD789c2f3DB184D9251927D88387913' },
  { nameItem: 'Sacred Bark', address: '0x2188c881C20632C97bd18234Db481E12c372b981' },
  { nameItem: 'Soul Stone', address: '0x8254B1aA38239101Fbc0721297BA9E553bD9cA7f' },
  { nameItem: 'Jelly Lump', address: '0x9b2dC24FB1C2F588392B992F8397dd3D24fbB5B5' },
  { nameItem: 'Golden Reed', address: '0x60F73E74Bd45EcCF464650F7c5094D37AD4BF17E' },
  { nameItem: 'Dream Lotus', address: '0x09e4b04995d982131A24A7EfBc1AA084C8b3f248' },
  { nameItem: 'Black Pearl', address: '0x6e6787E0dA9f430c3d194645c4046Be85AdE35AA' },
  { nameItem: 'Rainbow Weed', address: '0xE1b69B33cA6d3e423f7500AA9ef0c08cC56f40F9' },
  { nameItem: 'Fiberglass', address: '0xF311D220130Cc836cFb0281B99AeDD58548B271C' },
  { nameItem: 'String', address: '0xB3eDee17077038307Bb27FC8127f2cb3bF3f0a4A' },
  { nameItem: 'Crystal Shank', address: '0x9dc6E9c871828F3532c58366a0C3926d1C1351eA' },
  { nameItem: 'Crystal Claw', address: '0x6AEDbEF4e44052C707C1915805856241415c913c' },
  { nameItem: 'Black Horn', address: '0x72CA009aE1F3171e64F99f6060da1c37054E052b' },
  { nameItem: 'Magic Solution', address: '0x27585096CE8768c660917525f177b8dD3de5C198' },
  { nameItem: 'Toxic blossom', address: '0xC9331F5933856DF17536101E7026a7E8E00BBadd' },
  { nameItem: 'Terra core', address: '0xcd774ebd98ff1C9A648F152f8fc855E7360a6E92' },
  { nameItem: 'Vital Marrow', address: '0x7Baa9DD73B4aB017e677224FEB4AFE57C8Fc132e' },
  { nameItem: 'Hard Scale', address: '0x8E464188Ab0F6459a231ce32Ed3ab4E4F7ef57FD' },
  { nameItem: 'Soul fragment', address: '0x145CC98cE342bd02d9C783c2658a4DA7122CA845' },
  { nameItem: 'Illuminated soul fragment', address: '0xbb546B399b1767883b083Fef9E69a16dd0185cDD' },
  { nameItem: 'Rune', address: '0xe0Fe58c3eF55d60300125C612BC4A583f55302c2' },
  { nameItem: 'Empowered Rune', address: '0x8e88E1075b13a4Ea9B842C08299501E0BA21e08b' },
  { nameItem: 'Divine Rune', address: '0x5Ecc898f97F98a377565957e99A4Df604B2B282A' },
  { nameItem: 'Extinct Plant Seed', address: '0x3b3CB3BaEd69aC8b935BDD4638D0A5b8F6E85064' },
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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name Item</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Max total supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.address}>
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
    </div>
  );
};

export default ItemTable;