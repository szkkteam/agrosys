"""Task actual_cost and predicted_cost can be null now.

Revision ID: 20e072b68d4a
Revises: 9040caa3bade
Create Date: 2020-08-14 16:00:20.126688

"""
from alembic import op
import sqlalchemy as sa
import backend


# revision identifiers, used by Alembic.
revision = '20e072b68d4a'
down_revision = '9040caa3bade'
branch_labels = ()
depends_on = None


def upgrade():

    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('task', 'actual_cost',
               existing_type=sa.NUMERIC(),
               nullable=True)
    op.alter_column('task', 'predicted_cost',
               existing_type=sa.NUMERIC(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('task', 'predicted_cost',
               existing_type=sa.NUMERIC(),
               nullable=False)
    op.alter_column('task', 'actual_cost',
               existing_type=sa.NUMERIC(),
               nullable=False)
    op.create_table('spatial_ref_sys',
    sa.Column('srid', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('auth_name', sa.VARCHAR(length=256), autoincrement=False, nullable=True),
    sa.Column('auth_srid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('srtext', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.Column('proj4text', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.CheckConstraint('(srid > 0) AND (srid <= 998999)', name='spatial_ref_sys_srid_check'),
    sa.PrimaryKeyConstraint('srid', name='spatial_ref_sys_pkey')
    )
    # ### end Alembic commands ###