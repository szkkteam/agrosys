"""initial

Revision ID: 844a430e8494
Revises: 
Create Date: 2020-09-07 08:57:37.315106

"""
from alembic import op
import geoalchemy2
import sqlalchemy as sa
import backend


# revision identifiers, used by Alembic.
revision = '844a430e8494'
down_revision = None
branch_labels = ('default',)
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('agricultural_product',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=128), nullable=False),
    sa.Column('so_id', sa.String(length=16), nullable=False),
    sa.Column('so_unit', sa.String(length=16), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_agricultural_product'))
    )
    op.create_table('agricultural_type',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=False),
    sa.Column('description', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_agricultural_type'))
    )
    op.create_table('contact_submission',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('message', sa.String(length=500), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_contact_submission'))
    )
    op.create_index(op.f('ix_contact_submission_email'), 'contact_submission', ['email'], unique=False)
    op.create_table('country',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=False),
    sa.Column('iso2', sa.String(length=2), nullable=False),
    sa.Column('iso3', sa.String(length=3), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_country'))
    )
    op.create_index(op.f('ix_country_iso3'), 'country', ['iso3'], unique=True)
    op.create_table('group',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('group_name', sa.Unicode(length=128), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('member_count', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_group')),
    sa.UniqueConstraint('group_name', name=op.f('uq_group_group_name')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('newsletter_subscribe',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('is_active', sa.Boolean(name='is_active'), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_newsletter_subscribe'))
    )
    op.create_index(op.f('ix_newsletter_subscribe_email'), 'newsletter_subscribe', ['email'], unique=True)
    op.create_table('plan',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=128), nullable=False),
    sa.Column('plan_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('ordering', sa.Integer(), nullable=False),
    sa.Column('plan_name', sa.Unicode(length=100), nullable=False),
    sa.Column('plan_type', sa.Unicode(length=30), nullable=False),
    sa.ForeignKeyConstraint(['parent_id'], ['plan.plan_id'], name=op.f('fk_plan_parent_id_plan'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('plan_id', name=op.f('pk_plan')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('role',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_role'))
    )
    op.create_index(op.f('ix_role_name'), 'role', ['name'], unique=True)
    op.create_table('soil_type',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=False),
    sa.Column('yield_modifier', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_soil_type'))
    )
    op.create_table('unit',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_unit'))
    )
    op.create_table('user',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('first_name', sa.String(length=32), nullable=False),
    sa.Column('last_name', sa.String(length=64), nullable=False),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('active', sa.Boolean(name='active'), nullable=False),
    sa.Column('confirmed_at', backend.database.types.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_user'))
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.create_table('external_identity',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('external_id', sa.Unicode(length=255), nullable=False),
    sa.Column('external_user_name', sa.Unicode(length=255), nullable=True),
    sa.Column('local_user_id', sa.Integer(), nullable=False),
    sa.Column('provider_name', sa.Unicode(length=50), nullable=False),
    sa.Column('access_token', sa.Unicode(length=512), nullable=True),
    sa.Column('alt_token', sa.Unicode(length=512), nullable=True),
    sa.Column('token_secret', sa.Unicode(length=512), nullable=True),
    sa.ForeignKeyConstraint(['local_user_id'], ['user.id'], name=op.f('fk_external_identity_local_user_id_user'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('external_id', 'local_user_id', 'provider_name', name='pk_external_identity'),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('group_permission',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.Column('perm_name', sa.Unicode(length=64), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['group.id'], name=op.f('fk_group_permission_group_id_group'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('group_id', 'perm_name', name='pk_group_permission'),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('production',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('archived_at', backend.database.types.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['id'], ['plan.plan_id'], name=op.f('fk_production_id_plan'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_production')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('reference_parcel',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=True),
    sa.Column('notes', sa.String(length=256), nullable=True),
    sa.Column('geometry', geoalchemy2.types.Geometry(geometry_type='POLYGON', from_text='ST_GeomFromEWKT', name='geometry'), nullable=False),
    sa.Column('total_area', sa.Float(), nullable=False),
    sa.Column('eligible_area', sa.Float(), nullable=False),
    sa.Column('soil_type_id', sa.BigInteger(), nullable=False),
    sa.Column('agricultural_type_id', sa.BigInteger(), nullable=False),
    sa.Column('parcel_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('ancestor_id', sa.Integer(), nullable=True),
    sa.Column('ordering', sa.Integer(), nullable=False),
    sa.Column('parcel_name', sa.Unicode(length=100), nullable=False),
    sa.Column('parcel_type', sa.Unicode(length=30), nullable=False),
    sa.ForeignKeyConstraint(['agricultural_type_id'], ['agricultural_type.id'], name=op.f('fk_reference_parcel_agricultural_type_id_agricultural_type')),
    sa.ForeignKeyConstraint(['ancestor_id'], ['reference_parcel.parcel_id'], name=op.f('fk_reference_parcel_ancestor_id_reference_parcel'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['soil_type_id'], ['soil_type.id'], name=op.f('fk_reference_parcel_soil_type_id_soil_type')),
    sa.PrimaryKeyConstraint('parcel_id', name=op.f('pk_reference_parcel')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('region',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=False),
    sa.Column('so_code', sa.String(length=4), nullable=False),
    sa.Column('country_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['country_id'], ['country.id'], name=op.f('fk_region_country_id_country')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_region'))
    )
    op.create_table('resource',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('resource_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('ordering', sa.Integer(), nullable=False),
    sa.Column('resource_name', sa.Unicode(length=100), nullable=False),
    sa.Column('resource_type', sa.Unicode(length=30), nullable=False),
    sa.Column('owner_group_id', sa.Integer(), nullable=True),
    sa.Column('owner_user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['owner_group_id'], ['group.id'], name=op.f('fk_resource_owner_group_id_group'), onupdate='CASCADE', ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['owner_user_id'], ['user.id'], name=op.f('fk_resource_owner_user_id_user'), onupdate='CASCADE', ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['parent_id'], ['resource.resource_id'], name=op.f('fk_resource_parent_id_resource'), onupdate='CASCADE', ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('resource_id', name=op.f('pk_resource')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_index(op.f('ix_resource_owner_group_id'), 'resource', ['owner_group_id'], unique=False)
    op.create_index(op.f('ix_resource_owner_user_id'), 'resource', ['owner_user_id'], unique=False)
    op.create_table('specific_product',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=False),
    sa.Column('description', sa.String(length=256), nullable=True),
    sa.Column('base_yield', sa.Float(), nullable=False),
    sa.Column('unit_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['unit_id'], ['unit.id'], name=op.f('fk_specific_product_unit_id_unit')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_specific_product'))
    )
    op.create_table('task',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=True),
    sa.Column('description', sa.String(length=256), nullable=True),
    sa.Column('status', sa.Enum('Deleted', 'Pending', 'Completed', 'Archived', name='taskstatus'), nullable=False),
    sa.Column('start_date', backend.database.types.DateTime(timezone=True), nullable=False),
    sa.Column('end_date', backend.database.types.DateTime(timezone=True), nullable=False),
    sa.Column('predicted_cost', sa.Numeric(), nullable=True),
    sa.Column('actual_cost', sa.Numeric(), nullable=True),
    sa.Column('plan_id', sa.BigInteger(), nullable=False),
    sa.Column('task_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('ordering', sa.Integer(), nullable=False),
    sa.Column('task_name', sa.Unicode(length=100), nullable=False),
    sa.Column('task_type', sa.Unicode(length=30), nullable=False),
    sa.ForeignKeyConstraint(['parent_id'], ['task.task_id'], name=op.f('fk_task_parent_id_task'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['plan_id'], ['plan.plan_id'], name=op.f('fk_task_plan_id_plan'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('task_id', name=op.f('pk_task')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('template',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['plan.plan_id'], name=op.f('fk_template_id_plan'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_template')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('user_group',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['group.id'], name=op.f('fk_user_group_group_id_group'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_user_group_user_id_user'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('group_id', 'user_id', name=op.f('pk_user_group')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('user_permission',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('perm_name', sa.Unicode(length=64), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_user_permission_user_id_user'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('user_id', 'perm_name', name='pk_user_permission'),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('user_role',
    sa.Column('user_id', sa.BigInteger(), nullable=False),
    sa.Column('role_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], name=op.f('fk_user_role_role_id_role')),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_user_role_user_id_user')),
    sa.PrimaryKeyConstraint('user_id', 'role_id', name=op.f('pk_user_role'))
    )
    op.create_table('agricultural_parcel',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['reference_parcel.parcel_id'], name=op.f('fk_agricultural_parcel_id_reference_parcel'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_agricultural_parcel')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('agricultural_product_fact',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('agricultural_product_id', sa.BigInteger(), nullable=False),
    sa.Column('region_id', sa.BigInteger(), nullable=False),
    sa.Column('specific_product_id', sa.BigInteger(), nullable=False),
    sa.Column('value', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['agricultural_product_id'], ['agricultural_product.id'], name=op.f('fk_agricultural_product_fact_agricultural_product_id_agricultural_product'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['region_id'], ['region.id'], name=op.f('fk_agricultural_product_fact_region_id_region'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['specific_product_id'], ['specific_product.id'], name=op.f('fk_agricultural_product_fact_specific_product_id_specific_product'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('agricultural_product_id', 'region_id', 'specific_product_id', name=op.f('pk_agricultural_product_fact'))
    )
    op.create_table('cadastral_parcel',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['reference_parcel.parcel_id'], name=op.f('fk_cadastral_parcel_id_reference_parcel'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_cadastral_parcel')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('farm',
    sa.Column('title', sa.String(length=64), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('region_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['resource.resource_id'], name=op.f('fk_farm_id_resource'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['region_id'], ['region.id'], name=op.f('fk_farm_region_id_region'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_farm')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('farmers_block',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['reference_parcel.parcel_id'], name=op.f('fk_farmers_block_id_reference_parcel'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_farmers_block')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('group_resource_permission',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.Column('resource_id', sa.Integer(), autoincrement=False, nullable=False),
    sa.Column('perm_name', sa.Unicode(length=50), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['group.id'], name=op.f('fk_group_resource_permission_group_id_group'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['resource_id'], ['resource.resource_id'], name=op.f('fk_group_resource_permission_resource_id_resource'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('group_id', 'resource_id', 'perm_name', name='pk_group_resource_permission'),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('physical_block',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['reference_parcel.parcel_id'], name=op.f('fk_physical_block_id_reference_parcel'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_physical_block')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('plan_specific_product',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('plan_id', sa.BigInteger(), nullable=False),
    sa.Column('specific_product_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['plan_id'], ['plan.plan_id'], name=op.f('fk_plan_specific_product_plan_id_plan'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['specific_product_id'], ['specific_product.id'], name=op.f('fk_plan_specific_product_specific_product_id_specific_product'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('plan_id', 'specific_product_id', name=op.f('pk_plan_specific_product'))
    )
    op.create_table('reference_parcel_production',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('production_id', sa.BigInteger(), nullable=False),
    sa.Column('reference_parcel_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['production_id'], ['production.id'], name=op.f('fk_reference_parcel_production_production_id_production'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['reference_parcel_id'], ['reference_parcel.parcel_id'], name=op.f('fk_reference_parcel_production_reference_parcel_id_reference_parcel'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('production_id', 'reference_parcel_id', name=op.f('pk_reference_parcel_production'))
    )
    op.create_table('reference_parcel_property',
    sa.Column('specific_product_id', sa.BigInteger(), nullable=False),
    sa.Column('key', sa.Unicode(length=64), nullable=False),
    sa.Column('value', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['specific_product_id'], ['reference_parcel.parcel_id'], name=op.f('fk_reference_parcel_property_specific_product_id_reference_parcel')),
    sa.PrimaryKeyConstraint('specific_product_id', 'key', name=op.f('pk_reference_parcel_property'))
    )
    op.create_table('reference_parcel_relation',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('group_id', sa.BigInteger(), nullable=False),
    sa.Column('parcel_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['reference_parcel.parcel_id'], name=op.f('fk_reference_parcel_relation_group_id_reference_parcel'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['parcel_id'], ['reference_parcel.parcel_id'], name=op.f('fk_reference_parcel_relation_parcel_id_reference_parcel'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('group_id', 'parcel_id', name=op.f('pk_reference_parcel_relation'))
    )
    op.create_table('specific_product_property',
    sa.Column('specific_product_id', sa.BigInteger(), nullable=False),
    sa.Column('key', sa.Unicode(length=64), nullable=False),
    sa.Column('value', sa.String(length=128), nullable=False),
    sa.ForeignKeyConstraint(['specific_product_id'], ['specific_product.id'], name=op.f('fk_specific_product_property_specific_product_id_specific_product')),
    sa.PrimaryKeyConstraint('specific_product_id', 'key', name=op.f('pk_specific_product_property'))
    )
    op.create_table('task_general',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['task.task_id'], name=op.f('fk_task_general_id_task'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_task_general')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('task_pruning',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['task.task_id'], name=op.f('fk_task_pruning_id_task'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_task_pruning')),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('user_resource_permission',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('resource_id', sa.Integer(), autoincrement=False, nullable=False),
    sa.Column('perm_name', sa.Unicode(length=64), nullable=False),
    sa.ForeignKeyConstraint(['resource_id'], ['resource.resource_id'], name=op.f('fk_user_resource_permission_resource_id_resource'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_user_resource_permission_user_id_user'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('user_id', 'resource_id', 'perm_name', name='pk_user_resource_permission'),
    mysql_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('farm_template',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('farm_id', sa.BigInteger(), nullable=False),
    sa.Column('template_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['farm_id'], ['farm.id'], name=op.f('fk_farm_template_farm_id_farm'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['template_id'], ['template.id'], name=op.f('fk_farm_template_template_id_template'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('farm_id', 'template_id', name=op.f('pk_farm_template'))
    )
    op.create_table('season',
    sa.Column('id', sa.BigInteger().with_variant(sa.INTEGER(), 'sqlite'), autoincrement=True, nullable=False),
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=True),
    sa.Column('farm_id', sa.BigInteger(), nullable=False),
    sa.Column('archived_at', backend.database.types.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['farm_id'], ['farm.id'], name=op.f('fk_season_farm_id_farm'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_season'))
    )
    op.create_table('season_reference_parcel',
    sa.Column('created_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', backend.database.types.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('season_id', sa.BigInteger(), nullable=False),
    sa.Column('reference_parcel_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['reference_parcel_id'], ['reference_parcel.parcel_id'], name=op.f('fk_season_reference_parcel_reference_parcel_id_reference_parcel'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['season_id'], ['season.id'], name=op.f('fk_season_reference_parcel_season_id_season'), onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('season_id', 'reference_parcel_id', name=op.f('pk_season_reference_parcel'))
    )
    #op.drop_table('spatial_ref_sys')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('spatial_ref_sys',
    sa.Column('srid', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('auth_name', sa.VARCHAR(length=256), autoincrement=False, nullable=True),
    sa.Column('auth_srid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('srtext', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.Column('proj4text', sa.VARCHAR(length=2048), autoincrement=False, nullable=True),
    sa.CheckConstraint('(srid > 0) AND (srid <= 998999)', name='spatial_ref_sys_srid_check'),
    sa.PrimaryKeyConstraint('srid', name='spatial_ref_sys_pkey')
    )
    op.drop_table('season_reference_parcel')
    op.drop_table('season')
    op.drop_table('farm_template')
    op.drop_table('user_resource_permission')
    op.drop_table('task_pruning')
    op.drop_table('task_general')
    op.drop_table('specific_product_property')
    op.drop_table('reference_parcel_relation')
    op.drop_table('reference_parcel_property')
    op.drop_table('reference_parcel_production')
    op.drop_table('plan_specific_product')
    op.drop_table('physical_block')
    op.drop_table('group_resource_permission')
    op.drop_table('farmers_block')
    op.drop_table('farm')
    op.drop_table('cadastral_parcel')
    op.drop_table('agricultural_product_fact')
    op.drop_table('agricultural_parcel')
    op.drop_table('user_role')
    op.drop_table('user_permission')
    op.drop_table('user_group')
    op.drop_table('template')
    op.drop_table('task')
    op.drop_table('specific_product')
    op.drop_index(op.f('ix_resource_owner_user_id'), table_name='resource')
    op.drop_index(op.f('ix_resource_owner_group_id'), table_name='resource')
    op.drop_table('resource')
    op.drop_table('region')
    op.drop_table('reference_parcel')
    op.drop_table('production')
    op.drop_table('group_permission')
    op.drop_table('external_identity')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('unit')
    op.drop_table('soil_type')
    op.drop_index(op.f('ix_role_name'), table_name='role')
    op.drop_table('role')
    op.drop_table('plan')
    op.drop_index(op.f('ix_newsletter_subscribe_email'), table_name='newsletter_subscribe')
    op.drop_table('newsletter_subscribe')
    op.drop_table('group')
    op.drop_index(op.f('ix_country_iso3'), table_name='country')
    op.drop_table('country')
    op.drop_index(op.f('ix_contact_submission_email'), table_name='contact_submission')
    op.drop_table('contact_submission')
    op.drop_table('agricultural_type')
    op.drop_table('agricultural_product')
    # ### end Alembic commands ###