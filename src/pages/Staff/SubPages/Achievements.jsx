import React from 'react'
import { useUser } from '../../../context/UserContext'
import AchievementCard from '../../../components/Staff/AchievementCard'

const ACHIEVEMENT_DETAILS = {
  'staff-of-month': {
    title: 'Staff of the Month',
    description: 'Recorded to be one of the most hardworking employees of the month',
    stars: 1
  },
  'staff-of-year': {
    title: 'Staff of the Year',
    description: 'Recorded to be one of the most hardworking employees of the year',
    stars: 3
  },
  '100-point-master': {
    title: '100 Point Master',
    description: 'Earned 100 points for outstanding performance',
    stars: 2
  },
  'best-files': {
    title: 'Best Files',
    description: 'Consistently submitted high-quality work files',
    stars: 2
  }
}

const Achievements = () => {
  const { user, loading, error } = useUser()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <div className="text-lg">Loading achievements...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <div className="text-red-600 text-lg">Error: {error}</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <div className="text-lg">Unable to load user data. Please try again later.</div>
      </div>
    )
  }

  const achievements = [
    ...(user.badges || []),
    ...(user.reward_lists || [])
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>
      {achievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievementId) => {
            const details = ACHIEVEMENT_DETAILS[achievementId] || {
              title: achievementId,
              description: 'Achievement unlocked',
              stars: 1
            }
            
            return (
              <AchievementCard
                key={achievementId}
                title={details.title}
                description={details.description}
                stars={details.stars}
              />
            )
          })}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No achievements yet. Keep up the good work!
        </div>
      )}
    </div>
  )
}

export default Achievements

