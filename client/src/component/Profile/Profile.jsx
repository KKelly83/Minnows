import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  Progress,
  Stack,
  VStack,
  HStack,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FaFire, FaMedal, FaClock, FaBolt } from "react-icons/fa";

const ProfileStats = ({ stats }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem w="100%">
        <VStack bg="gray.100" p={4} borderRadius="lg" alignItems="flex-start">
          <HStack>
            <Icon as={FaClock} />
            <Text>Day streak</Text>
          </HStack>
          <Text fontWeight="bold">{stats.dayStreak}</Text>
        </VStack>
      </GridItem>
      <GridItem w="100%">
        <VStack bg="gray.100" p={4} borderRadius="lg" alignItems="flex-start">
          <HStack>
            <Icon as={FaClock} />
            <Text>Day streak</Text>
          </HStack>
          <Text fontWeight="bold">{stats.dayStreak}</Text>
        </VStack>
      </GridItem>
    </Grid>
  );
};

const AchievementBadge = ({ achievement }) => {
  return (
    <HStack>
      <Badge p={4} colorScheme="orange" borderRadius="lg">
        <Icon as={FaFire} mr={2} />
        <Text>{achievement.name}</Text>
      </Badge>
      <Progress
        value={achievement.progress}
        max={achievement.maxProgress}
        w="full"
      />
    </HStack>
  );
};

const Profile = ({ user }) => {
  return (
    <Box p={6}>
      <Flex alignItems="center">
        <Avatar name={user.name} src={user.avatar} size="xl" />
        <Box ml={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {user.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {user.username}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {user.joinDate}
          </Text>
          <HStack spacing={4}>
            <Text fontSize="sm">
              <b>{user.following}</b> Following
            </Text>
            <Text fontSize="sm">
              <b>{user.followers}</b> Followers
            </Text>
          </HStack>
        </Box>
      </Flex>
      <ProfileStats stats={user.stats} />
      <Box mt={6}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Achievements
        </Text>
        {user.achievements.map((achievement) => (
          <AchievementBadge key={achievement.name} achievement={achievement} />
        ))}
      </Box>
    </Box>
  );
};

// Sample usage of Profile component
const userProfile = {
  name: "Willy",
  username: "willy831773",
  joinDate: "Joined February 2024",
  following: 0,
  followers: 0,
  stats: {
    dayStreak: 0,
    totalXP: 30,
    currentLeague: "None",
    topFinishes: 0,
  },
  achievements: [
    {
      name: "Wildfire",
      progress: 30,
      maxProgress: 100,
    },
    // Add more achievements here
  ],
  avatar: "/path-to-avatar-image.png", // Replace with path to avatar image
};

function Profile1() {
  return <Profile user={userProfile} />;
}

export default Profile1;
