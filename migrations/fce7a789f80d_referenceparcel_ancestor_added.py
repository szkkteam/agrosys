"""ReferenceParcel ancestor added

Revision ID: fce7a789f80d
Revises: 62ca544ec0ba
Create Date: 2020-08-29 18:53:48.539507

"""
from alembic import op
import sqlalchemy as sa
import backend


# revision identifiers, used by Alembic.
revision = 'fce7a789f80d'
down_revision = '62ca544ec0ba'
branch_labels = ()
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('reference_parcel', sa.Column('ancestor_id', sa.Integer(), nullable=True))
    op.drop_index('idx_reference_parcel_geometry', table_name='reference_parcel')
    op.create_foreign_key(op.f('fk_reference_parcel_ancestor_id_reference_parcel'), 'reference_parcel', 'reference_parcel', ['ancestor_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(op.f('fk_reference_parcel_ancestor_id_reference_parcel'), 'reference_parcel', type_='foreignkey')
    op.create_index('idx_reference_parcel_geometry', 'reference_parcel', ['geometry'], unique=False)
    op.drop_column('reference_parcel', 'ancestor_id')
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
