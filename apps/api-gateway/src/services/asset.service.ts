import { PrismaClient } from '@dharma/data-access'

export class AssetService {
  constructor(private prisma: PrismaClient) {}

  async listAssets(orgId?: string) {
    return this.prisma.physicalAsset.findMany({
      where: orgId ? { orgId } : {},
      include: {
        org: true,
        custodian: true
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  async getAsset(id: string) {
    return this.prisma.physicalAsset.findUnique({
      where: { id },
      include: {
        org: true,
        custodian: true
      }
    })
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

    return this.prisma.physicalAsset.create({
      data: {
        ...data,
        qrCode,
        status: 'ACTIVE'
      }
    })
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.physicalAsset.update({
      where: { id },
      data: { status }
    })
  }
}
