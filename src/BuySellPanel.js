import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/layout';
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from '@chakra-ui/number-input';
import { Progress } from '@chakra-ui/progress';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBalance } from './features/balanceSlice';

function currencyFormat(num) {
	return num.toFixed(1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function BuySellPanel({ price, quantity }) {
	const balance = useSelector(selectBalance);
	const [isBuy, setIsBuy] = useState(true);
	const parse = (val) => val.replace(/^\$/, '');
	const [currentBalance, setCurrentBalance] = useState(balance);
	const [inputQuantity, setInputQuantity] = useState('0');
	const [allowQuantity, setAllowQuantity] = useState(null);
	const [activate, setActivate] = useState(false);

	useEffect(() => {
		setCurrentBalance(typeof balance === 'string' ? Number(balance) : balance);

		if (isBuy) {
			setAllowQuantity(Math.floor(currentBalance / price));
		} else {
			setAllowQuantity(quantity);
		}

		return () => {
			setAllowQuantity(null);
			setActivate(false);
		};
	}, [balance, isBuy, price, quantity]);

	return (
		<Box d="flex" flex="0.3" >
			<Box borderLeftWidth="1px" >
				<Flex justifyContent="space-between">
					<Button
						flex="0.5"
						size="lg"
						variant="outline"
						border="0px"
						borderRadius="10px"
						isActive={isBuy}
						_active={{
							bg: '#1E88E5',
							transform: 'scale(0.98)',
							borderColor: '#bec3c9',
						}}
						backgroundColor="#2A2E39"
						_hover={{ bg: '#363A45' }}
						textColor="white"
						onClick={() => setIsBuy((isBuy) => !isBuy)}
					>
						Buy
					</Button>
					<Button
						flex="0.5"
						size="lg"
						variant="outline"
						border="0px"
						borderRadius="10px"
						isActive={!isBuy}
						_active={{
							bg: '#EF5350',
							transform: 'scale(0.98)',
							borderColor: '#bec3c9',
						}}
						backgroundColor="#2A2E39"
						_hover={{ bg: '#363A45' }}
						textColor="white"
						onClick={() => setIsBuy((isBuy) => !isBuy)}
					>
						Sell
					</Button>
				</Flex>

				<Tabs mt="15px" isFitted variant="enclosed">
					<TabList mb="1em">
						<Tab>Market</Tab>
						<Tab>Limit</Tab>
						<Tab>Stop</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Text mb="5px">Quantity</Text>
							<NumberInput
								onChange={(valueString) => setInputQuantity(parse(valueString))}
								defaultValue={inputQuantity}
								min={0}
								max={allowQuantity}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>

							<Alert mt="20px" status={isBuy ? 'info' : 'warning'}>
								<AlertIcon />
								You could {isBuy ? 'purchase' : 'sell'} up to {allowQuantity}{' '}
								coins!
							</Alert>

							<Text mt="100px" fontWeight="bold" borderTopWidth="1px">
								Order Info
							</Text>
							<Flex justifyContent="space-between">
								<Text mt="5px">Trade Value</Text>
								<Text mt="5px" ml="0px">
									${currencyFormat(inputQuantity * price)}
								</Text>
							</Flex>
							<Flex justifyContent="space-between">
								<Text mt="5px">Remain Balance</Text>
								<Text mt="5px" ml="0px">
									$
									{isBuy
										? currencyFormat(currentBalance - inputQuantity * price)
										: currencyFormat(currentBalance + inputQuantity * price)}
								</Text>
							</Flex>
						</TabPanel>

						<TabPanel>
							<Progress size="xs" isIndeterminate />
							<Alert status="warning" variant="left-accent">
								<AlertIcon />
								This feature is not feasible at the moment!
							</Alert>
						</TabPanel>
						<TabPanel>
							<Progress size="xs" isIndeterminate />
							<Alert status="warning" variant="left-accent">
								<AlertIcon />
								This feature is not feasible at the moment!
							</Alert>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Box>
	);
}

export default BuySellPanel;
