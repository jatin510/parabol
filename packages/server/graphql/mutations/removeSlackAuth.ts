import {GraphQLID, GraphQLNonNull} from 'graphql'
import RemoveSlackAuthPayload from '../types/RemoveSlackAuthPayload'
import {getUserId, isTeamMember} from '../../utils/authorization'
import publish from '../../utils/publish'
import standardError from '../../utils/standardError'
import {SubscriptionChannel} from 'parabol-client/types/constEnums'
import removeSlackAuths from './helpers/removeSlackAuths'
import {GQLContext} from '../graphql'

export default {
  name: 'RemoveSlackAuth',
  type: new GraphQLNonNull(RemoveSlackAuthPayload),
  description: 'Disconnect a team member from Slack',
  args: {
    teamId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'the teamId to disconnect from the token'
    }
  },
  resolve: async (
    _source: unknown,
    {teamId}: {teamId: string},
    {authToken, socketId: mutatorId, dataLoader}: GQLContext
  ) => {
    const operationId = dataLoader.share()
    const subOptions = {mutatorId, operationId}
    const viewerId = getUserId(authToken)

    // AUTH
    if (!isTeamMember(authToken, teamId)) {
      return standardError(new Error('Team not found'), {userId: viewerId})
    }

    // RESOLUTION
    const res = await removeSlackAuths(viewerId, teamId, true)
    if (res.error) {
      return standardError(res.error, {userId: viewerId})
    }
    const authId = res.authIds[0]

    const data = {authId, teamId, userId: viewerId}
    publish(SubscriptionChannel.TEAM, teamId, 'RemoveSlackAuthPayload', data, subOptions)
    return data
  }
}
