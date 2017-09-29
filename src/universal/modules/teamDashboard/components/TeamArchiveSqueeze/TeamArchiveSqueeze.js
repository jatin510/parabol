import PropTypes from 'prop-types';
import React from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import ui from 'universal/styles/ui';
import appTheme from 'universal/styles/theme/appTheme';
import Button from 'universal/components/Button/Button';
import Panel from 'universal/components/Panel/Panel';
import {PERSONAL_LABEL, PRO_LABEL} from 'universal/utils/constants';
import FontAwesome from 'react-fontawesome';

const TeamArchiveSqueeze = (props) => {
  const {cardsUnavailableCount, handleUpdate, styles} = props;
  const CARDS_COUNT = cardsUnavailableCount;
  const linkLabel = 'Compare Account Features';
  const linkURL = '#account-features'; // TODO: Link to new pricing page (TA)
  const iconStyles = {
    fontSize: ui.iconSize,
    marginLeft: '.125rem'
  };
  return (
    <div className={css(styles.archiveSqueezeOuter)}>
      <Panel bgTheme="light" depth={0} hasHeader={false}>
        <div className={css(styles.archiveSqueezeInner)}>
          <div className={css(styles.archiveSqueezeContent)}>
            <h2 className={css(styles.archiveSqueezeHeading)}>
              {`${CARDS_COUNT} Cards Unavailable!`}
            </h2>
            <p className={css(styles.archiveSqueezeCopy)}>
              {'With a '}<b>{`${PERSONAL_LABEL} Account`}</b>{' you can access archived cards for '}<b>{'14 days'}</b>{'.'}<br />
              {'For full access to your team’s archive, upgrade to a '}<b>{`${PRO_LABEL} Account`}</b>{'.'}<br />
              <a href={linkURL} target="_blank" title={linkLabel}>
                <b>{linkLabel}</b> <FontAwesome name="external-link-square" style={iconStyles} />
              </a>
            </p>
          </div>
          <div className={css(styles.archiveSqueezeButtonBlock)}>
            <Button
              colorPalette="cool"
              depth={1}
              label={`Update to a ${PRO_LABEL} Account`}
              onClick={handleUpdate}
              size="large"
            />
          </div>
        </div>
      </Panel>
    </div>
  );
};

TeamArchiveSqueeze.propTypes = {
  cardsUnavailableCount: PropTypes.number,
  handleUpdate: PropTypes.func,
  styles: PropTypes.object,
  teamId: PropTypes.string,
  userId: PropTypes.string.isRequired
};

const styleThunk = () => ({
  archiveSqueezeOuter: {
    margin: '0 auto',
    maxWidth: '56rem',
    minWidth: 0
  },

  archiveSqueezeInner: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: ui.rowGutter
  },

  archiveSqueezeContent: {
    padding: '0 .5rem 1rem'
  },

  archiveSqueezeHeading: {
    color: ui.palette.mid,
    fontSize: appTheme.typography.s6,
    lineHeight: 1.5,
    margin: '.5rem 0'
  },

  archiveSqueezeCopy: {
    color: ui.palette.dark,
    lineHeight: 1.75,
    fontSize: appTheme.typography.sBase
  },

  archiveSqueezeButtonBlock: {
    padding: '0 1rem'
  }
});

export default withStyles(styleThunk)(TeamArchiveSqueeze);
