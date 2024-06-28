const Plant = require('../models/plant');

async function getCountsByState() {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$state',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Sort by state name alphabetically
            }
        ];

        const counts = await Plant.aggregate(pipeline);

        // Add anonymous count if needed
        const anonymousCount = await Plant.countDocuments({ state: null });

        // Combine results into a single object
        const result = {
            counts,
            anonymousCount
        };

        return result;
    } catch (error) {
        throw new Error(`Error fetching counts by state: ${error.message}`);
    }
}

module.exports = {
    getCountsByState
};
