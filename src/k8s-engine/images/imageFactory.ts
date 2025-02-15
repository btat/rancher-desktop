import { ImageProcessor } from '@/k8s-engine/images/imageProcessor';
import NerdctlImageProcessor from '@/k8s-engine/images/nerdctlImageProcessor';
import * as K8s from '@/k8s-engine/k8s';

/**
 * An or-barred enum of valid string values for the names of supported image processors
 */
export type ImageProcessorName = 'nerdctl'; // | 'kim' has been dropped

/**
 * Currently there's only one image processor.
 * But at one point, when we transitioned from kim to nerdctl, there were two.
 * And there might be new ones in the future, so the only changes are adding the new
 * module and three lines to this file (one for the import, two for the switch stmt).
 * @param processorName
 * @param k8sManager
 */

export function createImageProcessor(processorName: ImageProcessorName, k8sManager: K8s.KubernetesBackend): ImageProcessor {
  switch (processorName) {
  case 'nerdctl':
    return new NerdctlImageProcessor(k8sManager);
  default:
    throw new Error(`No image processor called ${ processorName }`);
  }
}
