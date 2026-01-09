export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  timestamp: Date;
  cause?: string;
}

// Generate mock recent donations
const generateMockDonations = (): Donation[] => {
  const names = [
    "Shubh Walia",
    "Radhe Radhe",
    "Shri Nilesh Harihar Shirsekar",
    "Anurag Takale",
    "Anoop Karumanchi",
    "Rajendran MK",
    "Priyanksonu123@gmail.com",
    "Saikumar N",
    "Meenaz Bihari",
    "Navneet Kaur",
    "Raja gopal krishnaswami",
    "nilanjana chakraborty",
    "Niharika",
    "Rajesh Shinde",
    "T singh",
    "John Britto",
    "Abin Francis",
    "Karthik Babu",
    "Pankaj Sharma",
    "Rupanshu Goyal",
  ];

  const amounts = [100, 300, 450, 500, 1000, 2500, 3500, 5100];

  const donations: Donation[] = [];
  const now = new Date();

  for (let i = 0; i < 20; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    const timestamp = new Date(now.getTime() - Math.random() * 3600000); // Random time in last hour

    donations.push({
      id: `donation-${i + 1}`,
      donorName: randomName,
      amount: randomAmount,
      timestamp,
    });
  }

  return donations.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const recentDonations: Donation[] = generateMockDonations();

