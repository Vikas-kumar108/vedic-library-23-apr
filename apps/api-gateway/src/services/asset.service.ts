import { PrismaClient } from '@dharma/data-access'

export class AssetService {
  constructor(private prisma: PrismaClient) {}

  async listAssets(org_id?: string) {
    const assets = await this.prisma.physical_assets.findMany({
      where: org_id ? { org_id } : {},
      include: {
        organizations: true,
        users: { include: { profile: true } }
      },
      orderBy: { created_at: 'desc' }
    })

    return assets.map(a => ({
      id: a.id,
      name: a.name,
      tag: a.asset_tag,
      location: a.location,
      status: a.status,
      custodian: a.users?.profile?.full_name
    }))
  }

  async getAsset(id: string) {
    const asset = await this.prisma.physical_assets.findUnique({
      where: { id },
      include: {
        organizations: true,
        users: { include: { profile: true } }
      }
    })

    if (!asset) return null

    return {
      id: asset.id,
      name: asset.name,
      description: asset.description,
      tag: asset.asset_tag,
      location: asset.location,
      status: asset.status,
      custodian: asset.users?.profile?.full_name
    }
  }

  async createAsset(data: {
    name: string
    description?: string
    serialNumber?: string
    assetTag?: string
    value: number
    currency?: string
    location?: string
    orgId: string
    custodianId?: string
  }) {
    // Generate a unique QR code if not provided
    const qrCode = `VIOS-ASSET-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`

    return this.prisma.physical_assets.create({
      data: {
        org_id: data.orgId,
        name: data.name,
        description: data.description,
        serial_number: data.serialNumber,
        asset_tag: data.assetTag,
        total_value: data.value,
        location: data.location,
        custodian_id: data.custodianId,
        qr_code: qrCode,
        status: 'ACTIVE'
      }
    })
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.physical_assets.update({
      where: { id },
      data: { status }
    })
  }
}
