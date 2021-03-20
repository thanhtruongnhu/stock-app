import { Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import Icon from '@chakra-ui/icon';
import { useColorMode } from '@chakra-ui/color-mode';
import { useHistory } from 'react-router-dom';

function SidebarOption({ Img, title, id }) {
	const { colorMode, toggleColorMode } = useColorMode();
	const history = useHistory();
	const selectChannel = () => {
		if (id) {
			history.push(id);
		}
		// } else {
		// 	history.push(title);
		// }
	};

	// const
	return (
		<Box
			d="flex"
			alignItems="center"
			pl="3"
			fontSize="14px"
			fontWeight="500"
			h="8"
			onClick={selectChannel}
			_hover={
				colorMode === 'dark'
					? {
							fontWeight: 'bold',
							backgroundColor: '#606770',
					  }
					: {
							fontWeight: 'bold',
							backgroundColor: '#F2F2F2',
							opacity: '0.8',
					  }
			}
		>
			{/*ICON*/}
			{Img && <Icon as={Img} pr="1" />}
			{/*Only render an icon when Icon is passed in (available)*/}
			{/*TEXT*/}
			{Img ? (
				<Text>{title}</Text>
			) : (
				<Text as="h3">
					<span>#</span>
					{title}
				</Text>
			)}
			{/*If you don't pass an icon, it will start a channel (start with #) */}
		</Box>
	);
}

export default SidebarOption;
